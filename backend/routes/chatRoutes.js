import { Router } from "express";
import { accessChat,fetchChats,createGroupChat } from "../controllers/chatController.js";
import { protect } from "../lib/auth.js";

const router = Router();

router.post("/",protect, accessChat);
router.get("/",protect,  fetchChats);
// router.post("/group", protect, createGroupChat);
// router.put("/rename", protect, renameGroup);
// router.put("/groupadd", protect, addToGroup);
// router.put("/groupremove", protect, removeFromGroup);

export { router as chatRoutes };