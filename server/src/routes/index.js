import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";

const router = Router();

router.get("/").get(healthCheck);
router.post("/", (req, res, next) => {
  console.log(req.body);
  return res.status(400);
});
router.use("/auth", authRoutes);

router.use("/posts", postRoutes);

export default router;

//I didn't add the protected routes
