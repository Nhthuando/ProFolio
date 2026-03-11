import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {createPortfolio,getPortfolio,getPublicPortfolio,publishPortfolio,updatePortfolio, deletePortfolio} from "../controllers/portfolioController.js"

const router = express.Router();

// GET    /api/portfolio            — lấy portfolio của user đang login
// POST   /api/portfolio            — tạo portfolio
// PUT    /api/portfolio            — update portfolio
// PATCH  /api/portfolio/publish    — publish/unpublish portfolio
// GET    /api/portfolio/:slug      — xem portfolio public (không cần token)

router.get("" ,verifyToken ,getPortfolio);
router.get("/:slug"  ,getPublicPortfolio);
router.post("/", verifyToken, createPortfolio);
router.patch("/publish", verifyToken, publishPortfolio);
router.patch("/", verifyToken, updatePortfolio);
router.delete("/", verifyToken, deletePortfolio);

export default router;