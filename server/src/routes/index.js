import { Router } from "express";
import { healthCheck } from "../controllers";
import authRoutes from "./auth.routes";
import protectedRoutes from "./protected.routes";
import userRoutes from "./user.routes";

const router = Router();

router.get("/", healthCheck);

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

router.use("/protected", protectedRoutes);

export default router;
