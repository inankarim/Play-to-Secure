import Group from "../models/group.model.js";
import GroupMessage from "../models/group.message.model.js";
import User from "../models/user.model.js";
import { emitToGroup, notifyGroupMembers } from "../lib/socket.js"; // Import from your socket.js
// import { v2 as cloudinary } from "cloudinary"; // Uncomment if using cloudinary

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!members || members.length < 2) {
      return res.status(400).json({
        success: false,
        message: "A group must have at least two members",
      });
    }

    // Ensure all members exist
    const users = await User.find({ _id: { $in: members } });

    if (users.length !== members.length) {
      return res.status(400).json({
        success: false,
        message: "One or more users do not exist",
      });
    }

    // Ensure the logged-in user (creator) is part of the members
    if (!members.includes(req.user._id.toString())) {
      return res.status(400).json({
        success: false,
        message: "Creator must be part of the group",
      });
    }

    // Create the new group
    const newGroup = new Group({
      name,
      members,
      createdBy: req.user._id,
    });

    await newGroup.save();

    // Populate members info
    await newGroup.populate("members", "name avatarUrl profilePic fullName");

    // Notify all group members via Socket.io
    notifyGroupMembers(members, "groupCreated", newGroup);

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getGroupsForSidebar = async (req, res) => {
  try {
    const myId = req.user._id;
    
    // Fetch the groups the user is part of
    const groups = await Group.find({ members: myId }).populate("members", "name avatarUrl profilePic fullName");

    return res.status(200).json(groups);
  } catch (err) {
    console.error("Error in getGroupsForSidebar:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    
    // Check if user is member of the group
    const group = await Group.findById(groupId);
    if (!group || !group.members.includes(req.user._id)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    const messages = await GroupMessage.find({ groupId })
      .populate("senderId", "name avatarUrl profilePic fullName")
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (err) {
    console.error("Error in getGroupMessages:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { groupId } = req.params;
    const senderId = req.user._id;
    let imageUrl;

    // Check if user is member of the group
    const group = await Group.findById(groupId);
    if (!group || !group.members.includes(senderId)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    if (image) {
      // Upload image to Cloudinary
      // const uploadResponse = await cloudinary.uploader.upload(image);
      // imageUrl = uploadResponse.secure_url;
      imageUrl = image; // For now, just use the image data directly
    }

    // Create a new message for the group
    const newMessage = new GroupMessage({
      senderId,
      groupId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // Populate sender info
    await newMessage.populate("senderId", "name avatarUrl profilePic fullName");

    // Emit to all users in the group via Socket.io
    emitToGroup(groupId, "newGroupMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendGroupMessage controller:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addUserToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check if the requester is a member of the group
    if (!group.members.includes(req.user._id)) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    // Add the user to the group's members
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();

      // Populate the new member info
      const newUser = await User.findById(userId).select("name avatarUrl profilePic fullName");
      
      // Notify all group members about the new addition
      emitToGroup(groupId, "userAddedToGroup", {
        groupId,
        user: newUser,
        message: `${newUser.name || newUser.fullName} has been added to the group`
      });

      // Notify the new user about being added to the group
      notifyGroupMembers([userId], "groupCreated", group);
    }

    return res.status(200).json(group);
  } catch (err) {
    console.error("Error in addUserToGroup:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};