import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import Config from "./config/config.js";
import taskroute from "./routes/task.route.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://glowing-robot-one.vercel.app/",
  credentials: true
}));app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/tasks" , taskroute)
app.use("/api/ai", aiRoutes);

export default app;
