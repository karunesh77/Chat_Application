import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import { chatRoutes } from "./routes/chatRoutes.js";
import { messageRoutes } from "./routes/messageRoutes.js";
import colors from "colors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

// MIDDLEWARES
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // change if needed
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ROUTES
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.green.underline)
);