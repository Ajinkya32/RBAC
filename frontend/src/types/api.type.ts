import { PermissionType } from "@/constant";

export type loginType = { email: string; password: string };
export type LoginResponseType = {
  message: string;
  user: UserType;
};

export type registerType = {
  name: string;
  email: string;
  password: string;
};

//********** */ USER TYPES ************************
//************************************************* */
export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    name: string;
    permissions: PermissionType[];
  };
  isActive: true;
  lastLogin: null;
  createdAt: Date;
  updatedAt: Date;
  currentTeam: {
    _id: string;
    name: string;
    manager: string;
  };
};

export type CurrentUserResponseType = {
  message: string;
  user: UserType;
};

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
  roleId: string;
  teamId?: string;
};

export type CreateUserResponseType = {
  message: string;
  newMember: UserType;
};

export type AllUsersResponseType = {
  message: string;
  users: UserType[];
};

export type ChangeUserRoleType = {
  userId: string;
  roleId: string;
};

export type RoleType = {
  _id: string;
  name: string;
};

export type DeleteUserResponseType = {
  message: string;
};

//********** */ PRODUCT TYPES ************************
//************************************************* */

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdBy: {
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type CreateProductType = {
  name: string;
  description: string;
  price: number;
  image: FileList;
};

export type CreateProductResponseType = {
  message: string;
  product: ProductType;
};

export type EditProductType = {
  name: string;
  description: string;
  price: number;
  image: FileList | string;
};

export type EditProductResponseType = {
  message: string;
  product: ProductType;
};

//********** */ TEAM TYPES ************************
//************************************************* */

export type TeamType = {
  _id: string;
  name: string;
  manager: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type CreateTeamType = {
  name: string;
  managerId: string;
};

export type CreateTeamResponseType = {
  message: string;
  team: TeamType;
};

export type EditTeamType = {
  name: string;
  managerId: string;
};

export type EditTeamResponseType = {
  message: string;
  team: TeamType;
};

//********** */ MEMBER TYPES ************************
//************************************************* */
export type MemberType = {
  _id: string;
  user: UserType;
  team: TeamType;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateMemberType = {
  userId: string;
  teamId: string;
};

export type CreateMemberResponseType = {
  message: string;
  newMember: MemberType;
};

export type GetTeamMembersResponseType = {
  message: string;
  members: MemberType[];
};

export type DeleteMembersResponseType = {
  message: string;
  deletedMember: MemberType;
};

//********** */ ORDER TYPES ************************
//************************************************* */

export type OrderType = {
  _id: string;
  customer: UserType;
  team: TeamType;
  product: ProductType;
  quantity: number;
  price: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateOrderType = {
  team: string;
  product: string;
  quantity: number;
  price: number;
};

export type CreateOrderResponseType = {
  message: string;
  order: OrderType;
};

export type EditOrderType = {
  status: string;
};

export type EditOrderResponseType = {
  message: string;
  order: OrderType;
};

export type AnalyticsResponseType = {
  message: string;
  analytics: {
    totalOrders: number;
    pendingOrders: number;
    deliveredOrders: number;
  };
};
