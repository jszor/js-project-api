import { Thought } from "../models/thought.js"

export const getThought = async (req, res) => {
  const { id } = req.params

  try {
    const thought = await Thought.findById(id)

    if (!thought) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No thought found for the given id. Please try again with a different id."
      })
    }

    res.status(200).json({
      success: true,
      response: thought,
      message: "Success."
    })
  }
  
  catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error: failed to fetch thought. Please try again later."
    })
  }
}