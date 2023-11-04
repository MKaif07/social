import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createPost = async (req, res, next) => {
  try {
    const { userId, picturePath, description } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userRef: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      description,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
