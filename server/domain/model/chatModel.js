import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    users: Array,
    messageType: {
      type: String,
      enum: ["text", "video", "audio", "image"],
    },
    message: {
      type: String,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matches",
    },
    read: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
