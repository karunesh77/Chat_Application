// write code according to my file user and chat

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/db.js";
import {userRoutes} from "./routes/userRoutes.js";
import {chatRoutes} from "./routes/chatRoutes.js";
import {messageRoutes} from "./routes/messageRoutes.js";
import colors from "colors";




const app = express();
dotenv.config();
connectDB();

app.use(cors());

dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(express.json(({limit: "10mb"})));// to accept json data
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // to accept form data

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);



const PORT =  5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`.green.underline));