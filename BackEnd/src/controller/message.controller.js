import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
//we will actually use this becs we dont want to show all the users
export const getUsersForSidebar = async (req, res) => {
  try {
    const myId = req.user._id;

    // who I sent to
    const sentTo = await Message.distinct("receiverId", { senderId: myId });
    // who sent to me
    const receivedFrom = await Message.distinct("senderId", { receiverId: myId });

    // merge + dedupe + remove myself just in case
    const partnerIds = [
      ...new Set([...sentTo.map(String), ...receivedFrom.map(String)])
    ].filter(id => id !== String(myId));

    const users = await User.find({ _id: { $in: partnerIds } }).select("-password");

    return res.status(200).json(users);
  } catch (err) {
    console.error("Error in getUsersForSidebar:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: userToChatId,
        },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } =req.params;
    const senderId = req.user._id;
    let imageUrl;
    if(image){
        //upload image to cloundinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
    // todo: realtime functionality goes here => socket.io
  } catch (error) {
    console.log("Error in sendMessage controller; ",error.message);
    res.status(500).json({message: "Internal Server Error"});
  }
};
