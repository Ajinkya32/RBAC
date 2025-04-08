import { PermissionType } from "@/constant";
import API from "./axios-client";

import {
  AllUsersResponseType,
  CreateUserResponseType,
  CreateUserType,
  CreateProductType,
  CreateProductResponseType,
  EditProductType,
  EditProductResponseType,
  CreateTeamType,
  CreateTeamResponseType,
  EditTeamType,
  EditTeamResponseType,
  CurrentUserResponseType,
  LoginResponseType,
  loginType,
  registerType,
  ChangeUserRoleType,
  CreateMemberType,
  CreateMemberResponseType,
  DeleteMembersResponseType,
  CreateOrderType,
  CreateOrderResponseType,
  EditOrderType,
  EditOrderResponseType,
  DeleteUserResponseType,
  EditRoleResponseType,
} from "@/types/api.type";

export const loginMutationFn = async (data: loginType): Promise<LoginResponseType> => {
  const response = await API.post("/api/auth/login", data);
  return response.data;
};

export const registerMutationFn = async (data: registerType) =>
  await API.post("/api/auth/register", data);

export const logoutMutationFn = async () => await API.post("/api/auth/logout");

export const getCurrentUserQueryFn = async (): Promise<CurrentUserResponseType> => {
  const response = await API.get(`/api/user/current`);
  return response.data;
};

//******* USERS ********************************
//************************* */
export const getUsersQueryFn = async (): Promise<AllUsersResponseType> => {
  const response = await API.get("/api/user/all");

  return response.data.users;
};

export const createUserMutationFn = async (
  data: CreateUserType
): Promise<CreateUserResponseType> => {
  const response = await API.post(`/api/user/create`, data);
  return response.data;
};

export const changeUserRoleMutationFn = async ({ userId, roleId }: ChangeUserRoleType) => {
  const response = await API.put(`/api/user/update/role/${userId}`, { roleId: roleId });
  return response.data;
};

export const fetchTeams = async () => {
  const response = await API.get("/api/team");
  return response.data.teams;
};

export const setCurrentTeam = async (teamId: string) => {
  const response = await API.put(`/api/user/setCurrentTeam/${teamId}`);
  return response.data.user;
};

export const deleteUserMutationFn = async (userId: string): Promise<DeleteUserResponseType> => {
  const response = await API.put(`/api/user/delete/${userId}`);
  return response.data;
};

//******* PRODUCT ********************************
//************************* */

export const createProductMutationFn = async (
  data: CreateProductType
): Promise<CreateProductResponseType> => {
  const response = await API.post(`/api/product/create`, data, { headers: {} });
  return response.data;
};

export const getAllProductsQueryFn = async () => {
  const response = await API.get("/api/product");
  return response.data.products;
};

export const updateProductMutationFn = async ({
  id,
  data,
}: {
  id: string;
  data: EditProductType;
}): Promise<EditProductResponseType> => {
  const response = await API.put(`/api/product/update/${id}`, data, { headers: {} });
  return response.data.products;
};

export const deleteProductMutationFn = async (id: string) => {
  const response = await API.put(`/api/product/delete/${id}`);
  return response.data.products;
};

//******* TEAM ********************************
//************************* */

export const createTeamMutationFn = async (
  data: CreateTeamType
): Promise<CreateTeamResponseType> => {
  const response = await API.post(`/api/team/create`, data);
  return response.data;
};

export const getAllTeamsQueryFn = async () => {
  const response = await API.get("/api/team");
  return response.data.teams;
};

export const getTeamByIdQueryFn = async (id: string) => {
  const response = await API.get(`/api/team/${id}`);
  return response.data.team;
};

export const getAllTeamsUserIsMemberQueryFn = async () => {
  const response = await API.get(`/api/team/myTeams`);
  return response.data.teams;
};

export const editTeamMutationFn = async ({
  id,
  data,
}: {
  id: string;
  data: EditTeamType;
}): Promise<EditTeamResponseType> => {
  const response = await API.put(`/api/team/update/${id}`, data);
  return response.data.products;
};

export const deleteTeamMutationFn = async (id: string) => {
  const response = await API.put(`/api/team/delete/${id}`);
  return response.data.products;
};

export const fetchManagers = async () => {
  const response = await API.get("/api/user/managers");
  return response.data.managers;
};

export const getTeamAnalyticsQueryFn = async (teamId: string) => {
  if (!teamId) {
    return [];
  }
  const response = await API.get(`/api/team/analytics/${teamId}`);
  return response.data;
};

//******* MEMBERS ********************************
//************************* */
export const getMembersInTeamQueryFn = async (teamId: string) => {
  if (!teamId) {
    return [];
  }
  const response = await API.get(`/api/member/team/${teamId}`);
  return response.data.members;
};

export const createMemberMutationFn = async (
  data: CreateMemberType
): Promise<CreateMemberResponseType> => {
  const response = await API.post(`/api/member/create`, data);
  return response.data;
};

export const deleteMemberMutationFn = async (
  memberId: string
): Promise<DeleteMembersResponseType> => {
  const response = await API.put(`/api/member/delete/${memberId}`);
  return response.data;
};

//******* ORDERS ********************************
//************************* */

export const createOrderMutationFn = async (
  data: CreateOrderType
): Promise<CreateOrderResponseType> => {
  const response = await API.post(`/api/order/create`, data, { headers: {} });
  return response.data;
};

export const getAllOrdersQueryFn = async (teamId: string) => {
  if (!teamId) {
    return [];
  }
  const response = await API.get(`/api/order/team/${teamId}`);
  return response.data.orders;
};

export const getMyOrdersQueryFn = async () => {
  const response = await API.get(`/api/order/myorders`);
  return response.data.orders;
};

export const getMyOrdersAnalyticsFn = async () => {
  const response = await API.get(`/api/order/myorders/analytics`);
  return response.data;
};

export const updateOrderMutationFn = async ({
  id,
  data,
}: {
  id: string;
  data: EditOrderType;
}): Promise<EditOrderResponseType> => {
  const response = await API.put(`/api/order/update/${id}`, data, { headers: {} });
  return response.data.orders;
};

export const deleteOrderMutationFn = async (id: string) => {
  const response = await API.put(`/api/order/delete/${id}`);
  return response.data.orders;
};

//******* ROLES ********************************
//************************* */

export const fetchRolesQueryFn = async () => {
  const response = await API.get("/api/auth/roles/all");
  return response.data.roles;
};

export const editRoleMutationFn = async ({
  roleId,
  permissions,
}: {
  roleId: string;
  permissions: PermissionType[];
}): Promise<EditRoleResponseType> => {
  const response = await API.put(`/api/auth/roles/update/${roleId}`, { permissions });
  return response.data.roles;
};
