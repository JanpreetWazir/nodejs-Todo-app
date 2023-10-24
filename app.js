import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { middlewares } from "./middlewares/error.js"; // Assuming errorMiddleware is exported from the 'error.js' file
import cors from  "cors";

import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./data/config.env",
});

// Middleware
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin : [process.env.FRONTED_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,

}));

// Use the userRouter with the root URL path
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

// Using error middleware
app.use(middlewares); // Removed parentheses here
