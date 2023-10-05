import express from "express";
const router = express.Router();

import chatModel from "../../domain/model/chatModel.js";
import {
  addMessage,
  getMessage,
  getLastMessage,
  readmessage,
} from "../../controller/chatController.js";
import {
  VerifyJwtToken
} from "../../usecases/AuthInteractor.js";
import {
  verifyUserToken
} from "../../Frameworks/utils/Jwt.js";
import {
  addNewMsg,
  getAllChats,
  getLatestMessage,
  markChatAsRead
} from "../../usecases/ChatInteractor.js";
router.use(VerifyJwtToken(verifyUserToken));
router.post("/addmsg", addMessage(chatModel, addNewMsg));
router.post("/getmsg", getMessage(chatModel, getAllChats));
router.post("/lastmsg", getLastMessage(chatModel, getLatestMessage));
router.post("/markRead", readmessage(chatModel, markChatAsRead));


export default router;
