import express from "express";
import {createEducation, deleteEducation, getAllEducations, getEducation, updateEducation} from "../controllers/educationController.js"
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:portfolioId/edu", verifyToken, getAllEducations);
router.get("/:portfolioId/edu/:eduId", verifyToken, getEducation);
router.post("/:portfolioId/edu", verifyToken, createEducation);
router.patch("/:portfolioId/edu/:eduId", verifyToken, updateEducation);
router.delete("/:portfolioId/edu/:eduId", verifyToken, deleteEducation);

export default router;