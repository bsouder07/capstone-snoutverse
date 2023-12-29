import { Router } from "express";
import { getUserForProfile } from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/:userId", requireAuth(), getUserForProfile);

export default router;
