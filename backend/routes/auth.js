import { Router } from "express";
import Login from "../controllers/authController.js";

const router = Router();

router.post("/login", Login);

export default router;
