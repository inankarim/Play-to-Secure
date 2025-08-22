import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getGroupsForSidebar,
  getGroupMessages,
  sendGroupMessage,
  addUserToGroup,
  createGroup
} from "../controller/group.controller.js";

const router = express.Router();

// Debug middleware for group routes
router.use((req, res, next) => {
  console.log(`Group Route: ${req.method} ${req.path} - Body:`, req.body);
  next();
});

// Create a new group
router.post("/gcreate", protectRoute, createGroup);

// Get all groups the user is part of  
router.get("/", protectRoute, getGroupsForSidebar);

// Get all messages in a group
router.get("/:groupId/messages", protectRoute, getGroupMessages);

// Send a message in a group
router.post("/:groupId/send", protectRoute, sendGroupMessage);

// Add a user to a group
router.put("/:groupId/addUser", protectRoute, addUserToGroup);

export default router;