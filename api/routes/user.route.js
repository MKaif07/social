import express from "express";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
  updateUser,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.patch("/update/:id", verifyToken, updateUser);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:userId", verifyToken, getUser);
export default router;
