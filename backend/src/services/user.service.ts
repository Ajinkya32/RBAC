import mongoose from "mongoose";
import MemberModel from "../models/member.model";
import RoleModel, { RoleDocument } from "../models/roles-permission.model";
import UserModel, { UserDocument } from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import TeamModel from "../models/team.model";

export const getAllUserService = async () => {
  const users = await UserModel.find({})
    .populate(["currentTeam", "role"])
    .select("-password")
    .sort({ createdAt: -1 });

  if (!users) {
    throw new BadRequestException("User not found");
  }

  return users;
};

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate(["currentTeam", "role"])
    .select("-password");

  if (!user) {
    throw new BadRequestException("User not found");
  }

  return {
    user,
  };
};

export const createUserService = async (body: {
  email: string;
  name: string;
  password: string;
  teamId?: string;
  roleId: string;
}) => {
  const { email, name, password, teamId, roleId } = body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingUser = await UserModel.findOne({ email }).session(session);

    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    const role = await RoleModel.findById(roleId).session(session);

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    const user = new UserModel({
      email,
      name,
      password,
      role: role._id,
    });

    await user.save({ session });

    if (teamId) {
      const team = await TeamModel.findById(teamId).session(session);

      if (!team) {
        throw new NotFoundException("Team not found");
      }

      const member = new MemberModel({
        user: user._id,
        team: team._id,
        joinedAt: new Date(),
      });
      await member.save({ session });

      user.currentTeam = team._id as mongoose.Types.ObjectId;
      await user.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    console.log("End Session...");

    return { message: "User created successfully" };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    throw error;
  }
};

export const changeUserRoleService = async (userId: string, roleId: string) => {
  const role = await RoleModel.findById(roleId);

  if (!role) {
    throw new NotFoundException("Role not found");
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.role = role;

  await user.save();

  return {
    user,
  };
};

export const updateUserService = async (userId: string, data: Partial<UserDocument>) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundException("User not found");
  }

  Object.assign(user, data);

  await user.save();

  return {
    user,
  };
};

export const deleteUserService = async (userId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await UserModel.findById(userId)
      .populate<{ role: RoleDocument }>("role")
      .session(session);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    // Step 1: Check if user is a manager
    if (user.role.name === "MANAGER") {
      // Step 2: Find teams where user is the current manager
      const teamsManaged = await TeamModel.find({ manager: userId }).session(session);

      for (const team of teamsManaged) {
        // Step 3: Find all users (members) in the team except the one being deleted
        const otherMembers = await MemberModel.find({
          team: team._id,
          user: { $ne: userId },
        })
          .populate<{ user: UserDocument }>("user")
          .session(session);

        // Step 4: Check if there's another manager
        const anotherManager = otherMembers.find((member) => {
          return member.user?.role.toString() === user.role._id.toString();
        });

        if (!anotherManager) {
          throw new BadRequestException(`At least one manager required in team "${team.name}".`);
        }

        // Step 5: Reassign manager role to another manager in the team
        team.manager = anotherManager.user._id;
        await team.save({ session });
      }
    }

    // Proceed with deleting user and their team memberships
    await UserModel.deleteOne({ _id: userId }).session(session);
    await MemberModel.deleteMany({ user: userId }).session(session);

    await session.commitTransaction();
    session.endSession();

    return {
      message: "User deleted successfully",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getAllManagersService = async () => {
  const managers = await UserModel.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
      },
    },
    { $unwind: "$role" },
    { $match: { "role.name": "MANAGER" } },
    {
      $lookup: {
        from: "teams",
        localField: "currentTeam",
        foreignField: "_id",
        as: "currentTeam",
      },
    },
    { $unwind: { path: "$currentTeam", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        password: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return managers;
};

export const setCurrentTeamService = async (userId: string, teamId: string) => {
  const team = await TeamModel.findById(teamId);

  if (!team) {
    throw new NotFoundException("Team not found");
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.currentTeam = new mongoose.Types.ObjectId(teamId);

  await user.save();

  return {
    user,
  };
};
