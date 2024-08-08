import asyncHandler from "../middlewares/asyncHandler.js";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createMessage = asyncHandler(async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, receiverId],
      });
    }

    const newMessage = await Message({
      senderId: req.user._id,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export const getMessages = asyncHandler(async (req, res, next) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message");

    if (!conversation) res.status(200).json([]);

    res.status(200).json(conversation.message);
  } catch (error) {
    console.log({ "Error form getMessages": error });
    next(error);
  }
});
