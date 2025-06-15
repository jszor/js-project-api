import { Thought } from "../models/thought.js"

export const postThought = async (req, res) => {
  const { message } = req.body
  const user = req.user

  try {
    const newThought = await new Thought({ message, userId: user._id }).save()

    if (!newThought) {
      return res.status(400).json({
        success: false,
        response: [],
        message: "Failed to post thought."
      })
    }

    res.status(201).json({
      success: true,
      response: newThought,
      message: "Thought posted successfully."
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error: failed to post thought. Please try again later."
    })

  }
}