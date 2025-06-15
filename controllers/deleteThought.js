import { Thought } from "../models/thought.js"

export const deleteThought = async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  try {

    const thought = await Thought.findById(id)

    if (!thought) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Failed to delete thought: no thought found for the given id."
      })
    }

    if (thought.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        response: [],
        message: "Failed to delete thought: you are not authorized to delete this thought."
      })
    }

    await Thought.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      response: [],
      message: "Thought deleted successfully."
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error: failed to delete thought. Please try again later."
    })

  }
}