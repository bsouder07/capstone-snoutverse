import { Router } from "express";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  getGroupPosts,
  createPost,
  joinGroup,
} from "../controllers/groups.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", requireAuth(), getAllGroups);
router.get("/:id", requireAuth(), getGroupById);
router.get("/posts/:id", requireAuth(), getGroupPosts);
router.put("/join/:id", requireAuth(), joinGroup);
router.post("/posts/create/:id", requireAuth(), createPost);
router.post("/create", requireAuth(), createGroup);

export default router;
