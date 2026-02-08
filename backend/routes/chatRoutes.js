import { Router } from "express";
import { accessChat,fetchChats,createGroupChat } from "../controllers/chatController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);
router.post("/group", protect, createGroupChat);

export { router };