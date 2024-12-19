import express from "express";
import {
  createChat,
  createMessage,
  getAllUserChats,
  getChatMessages,
} from "../../controllers/messages/message.controller.js";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";
const router = express.Router();

router.post("/chats", isAuthenticated, createChat);
router.get("/chats/:userId", isAuthenticated, getAllUserChats);


// Messages
router.post("/message", isAuthenticated, createMessage);
router.get("/get-messages/:chatId", isAuthenticated, getChatMessages);

export default router;
