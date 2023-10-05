import mongoose from "mongoose"

const callSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    isVideoCall: {
      type: Boolean,
      default: false,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matches",
    }
  },
  {
    timestamps: true,
  }
)

const Call = mongoose.model("Call", callSchema)

export default Call