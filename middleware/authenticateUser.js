import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      response: [],
      message: "Authorization header missing or invalid."
    })
  }

  const token = authHeader.replace("Bearer ", "")

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        response: [],
        message: "User not found."
      })
    }

    req.user = user
    next()

  } catch (error) {

    res.status(401).json({
      success: false,
      response: [],
      message: "Invalid token."
    })

  }
}