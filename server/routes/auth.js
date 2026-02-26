import express from 'express';
import { dangky, dangnhap } from '../controllers/authController.js';

const router = express.Router();

router.post('/dangky', dangky);
router.post('/dangnhap', dangnhap);

export default router;
