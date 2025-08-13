
import express from "express";
import multer from "multer";
import { login, logout, signup, updateProfile, checkAuth, users } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // store file in memory

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Use multer for file upload
router.put("/update-profile", protectRoute, upload.single("profilePic"), updateProfile);

router.get("/check", protectRoute, checkAuth);
router.get("/user", protectRoute, users);

export default router;
