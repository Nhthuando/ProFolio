import express from "express";
import { getAllSkills, getSkill, createSkill, deleteSkill , updateSkill } from "../controllers/skillController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(verifyToken);

router.get('/:portfolioId/skills', getAllSkills);
router.get('/:portfolioId/skills/:skillId', getSkill);
router.post('/:portfolioId/skills', createSkill);
router.patch('/:portfolioId/skills/:skillId', updateSkill);
router.delete('/:portfolioId/skills/:skillId', deleteSkill);


export default router;