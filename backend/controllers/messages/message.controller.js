import { Chat } from "../../models/messages/chat.model.js";
import { Message } from "../../models/messages/message.model.js";
import { User } from "../../models/user/user.model.js";

export const createChat = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Create new chat
    const newChat = new Chat({
      participants: [senderId, receiverId],
      lastModified: new Date(),
    });

    const chat = await newChat.save();

    res.status(201).json({
      success: true,
      chat,
      message: "Chat created successfully!",
    });
  } catch (error) {
    console.error("Error while creating chat:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the chat. Please try again.",
    });
  }
};

export const getAllUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const chats = await Chat.find({
      // Find all chats where the user is a participant in.
      participants: { $in: [userId] },
    }).sort({ lastModified: -1 });

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    console.log("Error in getAllUserChats:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user chats.",
      error: error.message,
    });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { sender, receiver, content, chatId } = req.body;

    // Input validation
    if (!sender || !receiver || !content || !chatId) {
      return res.status(400).json({
        success: false,
        message: "All fields (sender, receiver, content, chatId) are required.",
      });
    }

    // Create and save the new message
    const newMessage = new Message({
      sender,
      receiver,
      content,
      chatId,
    });

    const message = await newMessage.save();

    // Update the last modified date of the chat
    await Chat.findByIdAndUpdate(chatId, {
      lastModified: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Message created successfully!",
      data: message,
    });
  } catch (error) {
    console.error("Error while creating message:", error.message);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while creating the message. Please try again.",
    });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Input validation
    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required.",
      });
    }

    // Verify chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    const { limit, offset } = req.query;

    const limitNumber = parseInt(limit, 10) || 20;
    const offsetNumber = parseInt(offset, 10) || 0;

    const messages = await Message.find({ chatId })
      .sort({ createdAt: -1 })
      .limit(limitNumber)
      .skip(offsetNumber);

    res.status(200).json({
      success: true,
      data: messages,
      pagination: {
        limit: limitNumber,
        offset: offsetNumber,
      },
    });
  } catch (error) {
    console.error("Error in getChatMessages:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching chat messages.",
      error: error.message,
    });
  }
};
