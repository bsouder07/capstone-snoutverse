import { Router } from "express";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  getGroupPosts,
  createPost,
  joinGroup,
  handleEditGroupIcon,
} from "../controllers/groups.controller";
import { requireAuth } from "../middleware/auth.middleware";
import {
  handleGroupIconUpload,
  handlePostImageUpload,
} from "../controllers/fileUpload.controller";

const router = Router();

router.get("/", requireAuth(), getAllGroups);
router.get("/:id", requireAuth(), getGroupById);
router.get("/posts/:id", requireAuth(), getGroupPosts);
router.put("/join/:id", requireAuth(), joinGroup);
router.put(
  "/edit-icon/:id",
  requireAuth(),
  handleGroupIconUpload,
  handleEditGroupIcon
);
router.post(
  "/posts/create/:id",
  requireAuth(),
  handlePostImageUpload,
  createPost
);
router.post(
  "/create",
  requireAuth(),
  handleGroupIconUpload,
  createGroup
);

export default router;
