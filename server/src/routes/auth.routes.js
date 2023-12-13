import { Router } from "express";
import { handleSignUp, handleSignIn } from "../controllers/auth.controller";
import { validateSignUp, validateSignIn } from "../middleware/validation.middleware";

const router = Router();

router.post("/signup",  handleSignUp);
router.post("/signin", validateSignIn, handleSignIn);

export default router;
