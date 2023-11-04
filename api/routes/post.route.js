import express from "express";
import { createPost, getAllPosts, likePost } from "../controller/post.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", verifyToken, getAllPosts);
router.post("/create", verifyToken, createPost);
router.patch("/:id/like", verifyToken, likePost);
export default router;
