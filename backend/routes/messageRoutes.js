import { Router } from "express";
import { protect } from "../lib/auth.js";
import { sendMessage, allMessages } from "../controllers/messageController.js";

const router = Router();

router.get("/",protect,sendMessage);

router.get("/:chatId",protect,allMessages);