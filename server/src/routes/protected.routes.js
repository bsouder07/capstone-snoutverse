import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/user", requireAuth(), (req, res) => {
  res.sendStatus(200);
});

router.get("/employee", requireAuth(2), (req, res) => {
  res.sendStatus(200);
});

router.get("/admin", requireAuth(1), (req, res) => {
  res.sendStatus(200);
});

export default router;
