import mongoose from "mongoose"

const thoughtSchema = new mongoose.Schema({
  message: { type: String, required: true },
  hearts: { type: Number, default: 0 },
}, 
{ 
  timestamps: { createdAt: true, updatedAt: false }
})

export const Thought = mongoose.model("Thought", thoughtSchema)