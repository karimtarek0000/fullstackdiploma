import { postModel } from "../../DB/models/post.model.js";
import { userModel } from "../../DB/models/user.model.js";

export const checkUser = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await userModel.findById(id);

    if (user) return next();

    res.status(401).json({ message: "User not found" });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const allPosts = async (req, res) => {
  try {
    const posts = await postModel.find();

    res.status(200).json({
      message: "All posts",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const allPostsWithUsers = async (_, res) => {
  try {
    const posts = await postModel
      .find()
      .populate({ path: "userID", select: "userName email" });

    res.status(200).json({
      message: "All posts with users",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const addPost = async (req, res) => {
  const { post, id } = req.body;

  try {
    const postData = await postModel.create(post);
    await userModel.findByIdAndUpdate(
      { _id: id },
      { $push: { postsID: postData._id } }
    );

    res.status(201).json({
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const deletePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await postModel.findOneAndDelete({
      _id: postId,
      userID: userId,
    });

    res.status(200).json({ message: "Delete post successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Post id or user id not correct",
    });
  }
};

export const updatePost = async (req, res) => {
  const { postId, userId, data } = req.body;

  try {
    const post = await postModel.findOneAndUpdate(
      {
        _id: postId,
        userID: userId,
      },
      data,
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not exist" });
    }

    res.status(200).json({ message: "Post updated successfully", data: post });
  } catch (error) {
    res.status(400).json({
      message: "Post id or user id not correct",
    });
  }
};

export const sortPosts = async (_, res) => {
  try {
    const posts = await postModel.find().sort({ createdAt: -1 });

    res.status(200).json({ message: "All posts with sort desc", data: posts });
  } catch (error) {
    res.status(400).json({
      message: "Post id or user id not correct",
    });
  }
};
