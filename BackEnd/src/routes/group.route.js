// Add this to your group routes file (where you have other group routes)

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
  removeUserFromGroup,
  getGroupsForSidebar,
  getGroupMessages,
  sendGroupMessage,
  addUserToGroup,
  createGroup,
  leaveGroup,
  renameGroup  // ← Add this import
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
router.get("/groups", protectRoute, getGroupsForSidebar);

// Get all messages in a group
router.get("/group/:groupId/messages", protectRoute, getGroupMessages);

// Send a message in a group
router.post("/group/:groupId/send", protectRoute, sendGroupMessage);

// Add a user to a group
router.put("/group/:groupId/addUser", protectRoute, addUserToGroup);

// Rename a group (NEW ROUTE)
router.put("/group/:groupId/rename", protectRoute, renameGroup);

// Add route for leaving a group
router.delete("/group/:groupId/leave", protectRoute, leaveGroup);

// Add route for removing a member from the group
router.delete("/group/:groupId/removeUser", protectRoute, removeUserFromGroup);

export default router;