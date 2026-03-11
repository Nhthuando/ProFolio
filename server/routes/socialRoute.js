import exress from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {createSocial,deleteSocial,getAllSocials,getSocial,updateSocial} from "../controllers/socialController.js";

const router = exress.Router();

router.get("/:portfolioId/social", verifyToken, getAllSocials);
router.get("/:portfolioId/social/:socialId", verifyToken, getSocial);
router.post("/:portfolioId/social", verifyToken, createSocial);
router.patch("/:portfolioId/social/:socialId", verifyToken, updateSocial);
router.delete("/:portfolioId/social/:socialId", verifyToken, deleteSocial);

export default router;