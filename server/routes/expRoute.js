import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {getAllExperiences, getExperience, createExperience, deleteExperience, updateExperience} from "../controllers/expirenceController.js"
const router = express.Router();

router.get('/:portfolioId/experiences', verifyToken, getAllExperiences);
router.get('/:portfolioId/experiences/:expId', verifyToken, getExperience);
router.post('/:portfolioId/experiences', verifyToken, createExperience);
router.patch('/:portfolioId/experiences/:expId', verifyToken, updateExperience);
router.delete('/:portfolioId/experiences/:expId', verifyToken, deleteExperience);

export default router;