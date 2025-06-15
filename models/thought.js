import mongoose from "mongoose"

const thoughtSchema = new mongoose.Schema({
  message: { 
    type: String, 
    required: true,
    minLength: 5,
    maxLength: 140
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Thought = mongoose.model("Thought", thoughtSchema)