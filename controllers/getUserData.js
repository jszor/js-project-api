import { User } from "../models/user.js"

export const getUserData = async (req, res) => {
  try {
    
    const user = req.user

    if (!user) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "Failed to get user data: no user found for the given id."
      })
    }

    res.status(200).json({
      success: true,
      response: { name: user.name },
      message: "Success"
    })
    
  } catch (error) {

    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error: failed to get user data. Please try again later."
    })

  }
}