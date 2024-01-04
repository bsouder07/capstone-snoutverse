import { Router } from "express";
import { createGroup } from "../controllers/groups.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", requireAuth(), createGroup);

export default router;
