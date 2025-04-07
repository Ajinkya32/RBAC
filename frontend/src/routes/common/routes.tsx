import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import SignIn from "@/page/auth/Sign-in";
import SiteDashboard from "@/page/site/Dashboard";
import Members from "@/page/site/Members";
import MyOrders from "@/page/site/MyOrders";
import Orders from "@/page/site/Orders";
import Products from "@/page/site/Products";
import Settings from "@/page/site/Settings";
import Store from "@/page/site/Store";
import Teams from "@/page/site/Teams";
import Users from "@/page/site/Users";

export const authenticationRoutePaths = [{ path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> }];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <SiteDashboard /> },
  { path: PROTECTED_ROUTES.USERS, element: <Users /> },
  { path: PROTECTED_ROUTES.MEMBERS, element: <Members /> },
  { path: PROTECTED_ROUTES.SETTINGS, element: <Settings /> },
  { path: PROTECTED_ROUTES.PRDOUCTS, element: <Products /> },
  { path: PROTECTED_ROUTES.TEAMS, element: <Teams /> },
  { path: PROTECTED_ROUTES.ORDERS, element: <Orders /> },
  { path: PROTECTED_ROUTES.MYORDERS, element: <MyOrders /> },
  { path: PROTECTED_ROUTES.STORE, element: <Store /> },
];
