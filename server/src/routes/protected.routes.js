import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/user", requireAuth(), (req, res) => {
  res.sendStatus(200);
});

router.get("/employee", requireAuth(), (req, res) => {
  res.sendStatus(200);
});

router.get("/admin", requireAuth(), (req, res) => {
  res.sendStatus(200);
});

export default router;
