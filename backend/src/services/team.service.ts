import mongoose from "mongoose";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import UserModel from "../models/user.model";
import TeamModel, { TeamDocument } from "../models/team.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import OrderModel from "../models/order.model";
import { OrderStatusEnum } from "../enums/order.enum";

export const getAllTeamsService = async () => {
  const teams = await TeamModel.find({}).populate("manager").exec();

  return teams;
};

//********************************
// CREATE NEW TEAM
//**************** **************/
export const createTeamService = async (body: { name: String; managerId: String }) => {
  const { managerId } = body;

  const managerRole = await RoleModel.findOne({ name: Roles.MANAGER });

  if (!managerRole) {
    throw new NotFoundException("Manager role not found");
  }

  const manager = await UserModel.findOne({ _id: managerId, role: managerRole._id });

  if (!manager) {
    throw new NotFoundException("Manager not found");
  }

  const team = new TeamModel({
    manager: manager._id,
    ...body,
  });

  await team.save();

  const member = new MemberModel({
    user: manager._id,
    team: team._id,
    joinedAt: new Date(),
  });

  await member.save();

  manager.currentTeam = team._id as mongoose.Types.ObjectId;

  await manager.save();

  return {
    team,
  };
};

//********************************
// GET TEAM USER IS A MEMBER
//**************** **************/
export const getAllTeamsUserIsMemberService = async (userId: string) => {
  const memberships = await MemberModel.find({ user: userId })
    .populate("team")
    .select("-password")
    .exec();

  // Extract team details from memberships
  const teams = memberships.map((membership) => membership.team);

  return teams;
};

export const getTeamByIdService = async (teamId: string) => {
  const team = await TeamModel.findById(teamId);

  if (!team) {
    throw new NotFoundException("Team not found");
  }

  const members = await MemberModel.find({ team: teamId });

  const teamWithMembers = {
    ...team.toObject(),
    members,
  };

  return {
    team: teamWithMembers,
  };
};

export const getTeamAnalyticsService = async (teamId: string) => {
  const totalOrders = await OrderModel.countDocuments({
    team: teamId,
  });

  const pendingOrders = await OrderModel.countDocuments({
    team: teamId,
    status: OrderStatusEnum.PENDING,
  });

  const deliveredOrders = await OrderModel.countDocuments({
    team: teamId,
    status: OrderStatusEnum.DELIVERED,
  });

  const analytics = {
    totalOrders,
    pendingOrders,
    deliveredOrders,
  };

  return analytics;
};

export const getTeamAnalyticsAdminService = async () => {
  const totalOrders = await OrderModel.countDocuments({});

  const pendingOrders = await OrderModel.countDocuments({
    status: OrderStatusEnum.PENDING,
  });

  const deliveredOrders = await OrderModel.countDocuments({
    status: OrderStatusEnum.DELIVERED,
  });

  const analytics = {
    totalOrders,
    pendingOrders,
    deliveredOrders,
  };

  return analytics;
};

//********************************
// UPDATE TEAM
//**************** **************/
export const updateTeamByIdService = async (teamId: string, updateData: Partial<TeamDocument>) => {
  let team = await TeamModel.findById(teamId);
  if (!team) {
    throw new NotFoundException("Team not found");
  }

  // Update the team details
  Object.assign(team, updateData);

  await team.save();

  return {
    team,
  };
};

export const deleteTeamService = async (teamId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const team = await TeamModel.findById(teamId).session(session);

    if (!team) {
      throw new NotFoundException("Team not found");
    }

    const manager = await UserModel.findById(team.manager).session(session);

    if (!manager) {
      throw new NotFoundException("Manager not found");
    }

    await OrderModel.deleteMany({ team: team._id }).session(session);

    await MemberModel.deleteMany({
      team: team._id,
    }).session(session);

    // Update the user's currentTeam if it matches the deleted team
    if (manager?.currentTeam?.equals(teamId)) {
      const memberTeam = await MemberModel.findOne({ user: manager._id }).session(session);
      // Update the user's currentTeam
      manager.currentTeam = memberTeam ? memberTeam.team : null;

      await manager.save({ session });
    }

    await team.deleteOne({ session });

    await session.commitTransaction();

    session.endSession();

    return {
      currentTeam: manager.currentTeam,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
