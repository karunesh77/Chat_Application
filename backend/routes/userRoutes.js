import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { allUser } from "../controllers/userController.js";
import { protect } from "../lib/auth.js";
import { upload } from "../lib/multer.js";

const router = Router();

router.post("/",upload.single("pic"),registerUser);
router.get("/",protect, allUser);

router.post("/login",loginUser);

export  { router as userRoutes };



