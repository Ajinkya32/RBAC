export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const AUTH_ROUTES = {
  SIGN_IN: "/",
};

export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
  USERS: "/users",
  MEMBERS: "/members",
  SETTINGS: "/site/:teamId/settings",
  PRDOUCTS: "/products",
  TEAMS: "/teams",
  ORDERS: "/orders",
  MYORDERS: "/myorders",
  STORE: "/store",
};
