import { Thought } from "../models/thought.js"

export const patchThoughtLikes = async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  try {

    const thought = await Thought.findById(id)
    
    if (!thought) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No thought found for the given id. Please try again with a different id."
      })
    }

    const hasLiked = thought.likes.includes(userId)

    if (hasLiked) {
      // remove like
      thought.likes = thought.likes.filter(like => like.toString() !== userId)
    } else {
      // add like
      thought.likes.push(userId)
    }

    await thought.save()

    res.status(200).json({
      success: true,
      response: thought,
      message: "Likes updated successfully."
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error: failed to update likes. Please try again later."
    })

  }
}