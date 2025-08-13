import Group from "../models/group.model.js";
import GroupMessage from "../models/group.message.model.js";
import Group from "../models/group.model.js";
import User from "../models/user.model.js"; // Import User model

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

    // Check if the number of users found is the same as the number of provided IDs
    if (users.length !== members.length) {
      return res.status(400).json({
        success: false,
        message: "One or more users do not exist",
      });
    }

    // Ensure the logged-in user (creator) is part of the members
    if (!members.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "Creator must be part of the group",
      });
    }

    // Create the new group
    const newGroup = new Group({
      name,
      members,
      createdBy: req.user._id, // Set the logged-in user as the group creator
    });

    // Save the group to the database
    await newGroup.save();

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

// Get groups that the user is a member of
export const getGroupsForSidebar = async (req, res) => {
  try {
    const myId = req.user._id;
    
    // Fetch the groups the user is part of
    const groups = await Group.find({ members: myId }).populate("members", "name avatarUrl");

    return res.status(200).json(groups);
  } catch (err) {
    console.error("Error in getGroupsForSidebar:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all messages in a group
export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await GroupMessage.find({ groupId })
      .populate("senderId", "name avatarUrl") // Populate the sender's details
      .sort({ createdAt: 1 }); // Sort messages by creation time (ascending)

    return res.status(200).json(messages);
  } catch (err) {
    console.error("Error in getGroupMessages:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Send a message in a group
export const sendGroupMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { groupId } = req.params;
    const senderId = req.user._id;
    let imageUrl;

    if (image) {
      // Upload image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Create a new message for the group
    const newMessage = new GroupMessage({
      senderId,
      groupId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendGroupMessage controller:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a user to a group
export const addUserToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Add the user to the group's members
    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    return res.status(200).json(group);
  } catch (err) {
    console.error("Error in addUserToGroup:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
