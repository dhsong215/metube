require("dotenv").config();
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRoouter";
import userRouter from "./routers/userRouter";

import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET, //random value
    resave: false,
    saveUninitialized: false, //almost use resave: false, saveUn..: true
    cookie: {
      maxAge: 200000,
    },
    autoRemove: "interval",
    autoRemoveInterval: 10,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/uploads/profileImages", express.static("uploads/profileImages"));
app.use("/uploads/videos", express.static("uploads/videos"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/video", videoRouter);
app.use("/user", userRouter);

export default app;
