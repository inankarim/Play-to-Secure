// routes/post.routes.js
import express from "express";
import {
  // Post Controllers
  createPost,
  getPosts,
  getPostById,
  getUserPosts,
  updatePost,
  deletePost,
  
  // Comment Controllers
  createComment,
  getComments,
  getReplies,
  updateComment,
  deleteComment,
  
  // Reaction Controllers
  addOrUpdateReaction,
  removeReaction,
  getReactions
} from "../controller/post.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js"; // Your auth middleware

const router = express.Router();

// ============ POST ROUTES ============

// Create a new post
router.post("/", protectRoute, createPost);

// Get all posts (with pagination)
router.get("/", protectRoute, getPosts);

// Get specific post by ID
router.get("/:id", protectRoute, getPostById);

// Get posts by specific user
router.get("/user/:userId", protectRoute, getUserPosts);

// Update a post
router.put("/:id", protectRoute, updatePost);

// Delete a post
router.delete("/:id", protectRoute, deletePost);

// ============ COMMENT ROUTES ============

// Create a comment on a post
router.post("/:id/comments", protectRoute, createComment);

// Get comments for a post
router.get("/:id/comments", protectRoute, getComments);

// Get replies for a comment
router.get("/comments/:commentId/replies", protectRoute, getReplies);

// Update a comment
router.put("/comments/:commentId", protectRoute, updateComment);

// Delete a comment
router.delete("/comments/:commentId", protectRoute, deleteComment);

// ============ REACTION ROUTES ============

// Add/Update reaction on post or comment
router.post("/:id/reactions", protectRoute, addOrUpdateReaction);

// Remove reaction from post or comment
router.delete("/:id/reactions", protectRoute, removeReaction);

// Get all reactions for a post or comment
router.get("/:id/reactions", protectRoute, getReactions);

export default router;