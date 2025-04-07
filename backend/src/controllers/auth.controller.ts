import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import passport from "passport";
import { getAllRollsService } from "../services/auth.service";

export const getAllRollsController = asyncHandler(async (req: Request, res: Response) => {
  const roles = await getAllRollsService();

  return res.status(HTTPSTATUS.OK).json({
    message: "All Roles fetched successfully",
    roles,
  });
});

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (err: Error | null, user: Express.User | false, info: { message: string } | undefined) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            message: info?.message || "Invalid email or password",
          });
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          return res.status(HTTPSTATUS.OK).json({
            message: "Logged in successfully",
            user,
          });
        });
      }
    )(req, res, next);
  }
);

export const logOutController = asyncHandler(async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to log out" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Failed to destroy session:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }

      res.clearCookie("connect.sid"); // replace with your actual session cookie name if different
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});
