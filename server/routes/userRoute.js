import express from "express";
import {getUser, updateUser} from "../controllers/userController.js";
import {verifyToken} from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/profile", verifyToken, getUser );
router.put("/profile", verifyToken, updateUser );

export default router;