import { Router } from "express";
import { handleSignUp, handleSignIn} from "../controllers/auth.controller";
import { validateSignUp, validateSignIn } from "../middleware/validation.middleware";
import { handleFileUpload } from "../controllers/fileUpload.controller";



const router = Router();

router.post("/signup",   handleSignUp);
router.post("/signin", validateSignIn, handleSignIn);
router.post("/upload", handleFileUpload);



export default router;

