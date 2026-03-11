import express from 'express';
import { getAllProject, createProject, deleteProject, getProject, updateProject } from '../controllers/projectController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/" ,verifyToken ,getAllProject);
router.get("/:id" ,verifyToken ,getProject);
router.post("/", verifyToken, createProject);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;