import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        success: false,
        response: [],
        message: "Failed to log in: invalid email or password."
      })
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN}
    )

    res.status(200).json({
      success: true,
      response: {
        accessToken,
        name: user.name,
        userId: user._id
      },
      message: "Log in successful."
    })

} catch (error) {

    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error: failed to log in. Please try again later."
    })

  }
}