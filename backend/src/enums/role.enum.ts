export const Roles = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
} as const;

export type RoleType = keyof typeof Roles;

export const Permissions = {
  // PRODUCTS
  CREATE_PRODUCT: "CREATE_PRODUCT",
  VIEW_PRODUCT: "VIEW_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",

  // USERS
  CREATE_USER: "CREATE_USER",
  VIEW_USER: "VIEW_USER",
  EDIT_USER: "EDIT_USER",
  DELETE_USER: "DELETE_USER",
  CHANGE_USER_ROLE: "CHANGE_USER_ROLE",

  // ORDERS
  CREATE_ORDER: "CREATE_ORDER",
  VIEW_ORDER: "VIEW_ORDER",
  EDIT_ORDER: "EDIT_ORDER",
  DELETE_ORDER: "DELETE_ORDER",

  // MEMBERS
  CREATE_MEMBER: "CREATE_MEMBER",
  VIEW_MEMBER: "VIEW_MEMBER",
  EDIT_MEMBER: "EDIT_MEMBER",
  DELETE_MEMBER: "DELETE_MEMBER",
  CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",

  // TEAMS
  CREATE_TEAM: "CREATE_TEAM",
  VIEW_TEAM: "VIEW_TEAM",
  EDIT_TEAM: "EDIT_TEAM",
  DELETE_TEAM: "DELETE_TEAM",

  // ROLES
  CREATE_ROLE: "CREATE_ROLE",
  VIEW_ROLE: "VIEW_ROLE",
  EDIT_ROLE: "EDIT_ROLE",
  DELETE_ROLE: "DELETE_ROLE",

  VIEW_ONLY: "VIEW_ONLY",
} as const;

export type PermissionType = keyof typeof Permissions;
