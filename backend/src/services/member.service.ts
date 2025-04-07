import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import TeamModel from "../models/team.model";
import UserModel from "../models/user.model";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const createMemberService = async (userId: string, teamId: string) => {
  const team = await TeamModel.findOne({ _id: teamId }).exec();
  if (!team) {
    throw new NotFoundException("Team not found");
  }

  const user = await UserModel.findById(userId).exec();
  if (!user) {
    throw new NotFoundException("User not found");
  }

  // Check if user is already a member
  const existingMember = await MemberModel.findOne({
    user: userId,
    team: teamId,
  }).exec();

  if (existingMember) {
    throw new BadRequestException("User is already a member of this team");
  }

  // Add user to team as a member
  const newMember = new MemberModel({
    user: user._id,
    team: team._id,
  });
  await newMember.save();

  return newMember;
};

export const deleteMemberService = async (memberId: string) => {
  const member = await MemberModel.deleteOne({ _id: memberId }).exec();

  if (!member) {
    throw new NotFoundException("Member not found");
  }

  return { deletedMember: member };
};

export const getTeamMembersService = async (teamId: string) => {
  const members = await MemberModel.find({
    team: teamId,
  })
    .populate("user", "name email role profilePicture -password")
    .populate("team");

  return { members };
};
