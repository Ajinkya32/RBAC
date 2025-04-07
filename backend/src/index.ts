import { networkInterfaces, NetworkInterfaceInfo } from "os";

import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";

import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import teamRoutes from "./routes/team.route";
import memberRoutes from "./routes/member.route";
import productRoutes from "./routes/product.route";
import orderRoutes from "./routes/order.route";

import isAuthenticated from "./middlewares/isAuthenticated.middleware";

import path from "path";

import multer from "multer";

const app = express();
const upload = multer();

const BASE_PATH = config.BASE_PATH;

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// app.use(upload.any());

const publicDir = path.resolve(__dirname, "../public");
app.use(express.static(publicDir));

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.MONGO_URI,
      collectionName: "sessions",
      stringify: false,
      ttl: 60 * 60 * 24, // 1 day (in seconds)
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day (in ms)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/team`, isAuthenticated, teamRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/product`, isAuthenticated, productRoutes);
app.use(`${BASE_PATH}/order`, isAuthenticated, orderRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// For production
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// app.get("*", (req, res) => {
//   try {
//     res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
//   } catch (error: any) {
//     throw new Error(error);
//   }
// });

app.use(errorHandler);

// For network ip address
const ip = Object.values(networkInterfaces())
  .flat()
  .find(
    (iface): iface is NetworkInterfaceInfo => iface?.family === "IPv4" && !iface.internal
  )?.address;

app.listen(config.PORT, async () => {
  console.log(
    `Server listening on http://${ip}:${config.PORT} or http://localhost:${config.PORT} in ${config.NODE_ENV}`
  );
  await connectDatabase();
});
