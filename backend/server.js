import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import connectDB from "./config/DB.js";
import authRoute from "./routes/authRoute.js";
import messageRoute from "./routes/messageRoute.js";
import usersRoute from "./routes/userRoute.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 8000;
connectDB();

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", usersRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`server is running of PORT ${PORT}`);
});
