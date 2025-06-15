import { Thought } from "../models/thought.js"

export const patchThought = async (req, res) => {
  const { id } = req.params
  const { updatedMessage } = req.body
  const userId = req.user._id

  try {
    const thought = await Thought.findById(id)

    if (!thought) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Failed to update thought: no thought found for given id."
      })
    }

    if (thought.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        response: [],
        message: "Failed to update thought: you are not authorized to update this thought."
      })
    }

    thought.message = updatedMessage
    await thought.save()

    res.status(200).json({
      success: true,
      response: thought,
      message: "Thought updated successfully."
    })

  } catch (error) {
    
    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error: failed to update thought. Please try again later."
    })

  }
}