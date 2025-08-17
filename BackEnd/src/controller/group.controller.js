import Group from "../models/group.model.js";
import GroupMessage from "../models/group.message.js";
import User from "../models/user.model.js";
import { emitToGroup, notifyGroupMembers } from "../lib/socket.js";
// import { v2 as cloudinary } from "cloudinary"; // Uncomment if using cloudinary

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    console.log("Creating group with data:", { name, members, creatorId: req.user._id });

    // Validate input
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }

    if (!members || !Array.isArray(members) || members.length < 1) {
      return res.status(400).json({
        success: false,
        message: "At least one member is required",
      });
    }

    // Remove duplicates and ensure creator is included
    const creatorId = req.user._id.toString();
    const uniqueMembers = [...new Set([creatorId, ...members])];

    console.log("Unique members:", uniqueMembers);

    // Validate that all members exist
    const users = await User.find({ _id: { $in: uniqueMembers } });
    console.log("Found users:", users.length, "Expected:", uniqueMembers.length);

    if (users.length !== uniqueMembers.length) {
      return res.status(400).json({
        success: false,
        message: "One or more users do not exist",
      });
    }

    // Create the new group
    const newGroup = new Group({
      name: name.trim(),
      members: uniqueMembers,
      createdBy: creatorId,
    });

    await newGroup.save();
    console.log("Group saved:", newGroup._id);

    // Populate members info
    await newGroup.populate("members", "name avatarUrl profilePic fullName");
    await newGroup.populate("createdBy", "name avatarUrl profilePic fullName");

    console.log("Group populated successfully");

    // Notify all group members via Socket.io
    const notificationPayload = {
      _id: newGroup._id,
      name: newGroup.name,
      members: newGroup.members,
      createdBy: newGroup.createdBy,
      createdAt: newGroup.createdAt,
      message: `You have been added to the group "${newGroup.name}"`,
    };

    const notifiedCount = notifyGroupMembers(uniqueMembers, "groupCreated", notificationPayload);
    console.log(`Notified ${notifiedCount} members about group creation`);

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getGroupsForSidebar = async (req, res) => {
  try {
    const myId = req.user._id;
    console.log("Fetching groups for user:", myId);
    
    // Fetch groups where user is a member, populate member info and latest message
    const groups = await Group.find({ members: myId })
      .populate("members", "name avatarUrl profilePic fullName")
      .populate("createdBy", "name avatarUrl profilePic fullName")
      .sort({ createdAt: -1 });

    console.log(`Found ${groups.length} groups for user ${myId}`);

    // Get latest message for each group for sidebar preview
    const groupsWithLastMessage = await Promise.all(
      groups.map(async (group) => {
        const lastMessage = await GroupMessage.findOne({ groupId: group._id })
          .populate("senderId", "name avatarUrl profilePic fullName")
          .sort({ createdAt: -1 });

        return {
          ...group.toObject(),
          lastMessage
        };
      })
    );

    return res.status(200).json(groupsWithLastMessage);
  } catch (err) {
    console.error("Error in getGroupsForSidebar:", err);
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;
    
    console.log("Fetching messages for group:", groupId, "user:", userId);

    // Check if user is member of the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.includes(userId)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    // Fetch messages with pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const messages = await GroupMessage.find({ groupId })
      .populate("senderId", "name avatarUrl profilePic fullName")
      .sort({ createdAt: -1 }) // Latest first for pagination
      .limit(limit)
      .skip(skip);

    // Reverse to show oldest first in UI
    const sortedMessages = messages.reverse();

    console.log(`Found ${sortedMessages.length} messages for group ${groupId}`);

    return res.status(200).json(sortedMessages);
  } catch (err) {
    console.error("Error in getGroupMessages:", err);
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { groupId } = req.params;
    const senderId = req.user._id;
    let imageUrl;

    console.log("Sending group message:", { groupId, senderId, hasText: !!text, hasImage: !!image });

    // Validate input
    if (!text && !image) {
      return res.status(400).json({ 
        message: "Message must contain text or image" 
      });
    }

    // Check if user is member of the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.includes(senderId)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    // Handle image upload
    if (image) {
      try {
        // TODO: Implement proper image upload to Cloudinary
        // const uploadResponse = await cloudinary.uploader.upload(image);
        // imageUrl = uploadResponse.secure_url;
        imageUrl = image; // For now, use the image data directly
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return res.status(500).json({ message: "Failed to upload image" });
      }
    }

    // Create a new message for the group
    const newMessage = new GroupMessage({
      senderId,
      groupId,
      text: text || "",
      image: imageUrl || null,
    });

    await newMessage.save();
    console.log("Message saved:", newMessage._id);

    // Populate sender info
    await newMessage.populate("senderId", "name avatarUrl profilePic fullName");

    // Emit to all users in the group via Socket.io
    const messagePayload = {
      _id: newMessage._id,
      senderId: newMessage.senderId,
      groupId: newMessage.groupId,
      text: newMessage.text,
      image: newMessage.image,
      createdAt: newMessage.createdAt,
      optimistic: false // This is a persisted message
    };

    const emitSuccess = emitToGroup(groupId, "newGroupMessage", messagePayload);
    console.log("Socket emission result:", emitSuccess);

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error in sendGroupMessage controller:", err);
    res.status(500).json({ 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const addUserToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const requesterId = req.user._id;

    console.log("Adding user to group:", { groupId, userId, requesterId });

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if the requester is a member of the group
    if (!group.members.includes(requesterId)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    // Check if user to be added exists
    const userToAdd = await User.findById(userId).select("name avatarUrl profilePic fullName");
    if (!userToAdd) {
      return res.status(404).json({ message: "User to be added not found" });
    }

    // Check if user is already in the group
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member of this group" });
    }

    // Add the user to the group's members
    group.members.push(userId);
    await group.save();

    console.log("User added to group successfully");

    // Populate the updated group
    await group.populate("members", "name avatarUrl profilePic fullName");
    await group.populate("createdBy", "name avatarUrl profilePic fullName");

    // Notify all group members about the new addition
    const additionPayload = {
      groupId,
      user: userToAdd,
      group: group,
      message: `${userToAdd.name || userToAdd.fullName} has been added to the group`
    };

    emitToGroup(groupId, "userAddedToGroup", additionPayload);

    // Notify the new user about being added to the group
    const groupNotification = {
      _id: group._id,
      name: group.name,
      members: group.members,
      createdBy: group.createdBy,
      createdAt: group.createdAt,
      message: `You have been added to the group "${group.name}"`,
    };

    notifyGroupMembers([userId], "groupCreated", groupNotification);

    console.log("Notifications sent successfully");

    return res.status(200).json({
      success: true,
      message: "User added to group successfully",
      group: group
    });
  } catch (err) {
    console.error("Error in addUserToGroup:", err);
    return res.status(500).json({ 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};