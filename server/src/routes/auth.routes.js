import { Router } from "express";
import {
  handleSignUp,
  handleSignIn,
} from "../controllers/auth.controller";
import {
  validateSignUp,
  validateSignIn,
} from "../middleware/validation.middleware";
import { handleRegProfilePicUpload } from "../controllers/fileUpload.controller";

const router = Router();

router.post("/signup", handleRegProfilePicUpload, handleSignUp);
router.post("/signin", validateSignIn, handleSignIn);

export default router;
