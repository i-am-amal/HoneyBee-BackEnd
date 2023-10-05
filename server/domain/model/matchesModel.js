import mongoose from "mongoose";

const matchesSchema = new mongoose.Schema(
  {
    user1: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      liked: {
        type: Boolean,
        default: false,
      },
    },
    user2: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      liked: {
        type: Boolean,
        default: false,
      },
    },
    isMatched: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Matches = mongoose.model("Matches", matchesSchema);

export default Matches;