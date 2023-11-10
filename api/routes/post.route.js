import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
} from "../controller/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", verifyToken, getAllPosts);
router.post("/create", verifyToken, createPost);
router.post("/get", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
export default router;
