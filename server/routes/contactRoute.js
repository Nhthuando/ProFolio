import express from "express";
import { sentContact, deleteContact, getContacts, markContactRead } from "../controllers/contactController.js";

const router = express.Router();

router.post("/:slug", sentContact);
router.get("/", getContacts);
router.patch("/:id/read", markContactRead);
router.delete("/:id", deleteContact);

export default router;