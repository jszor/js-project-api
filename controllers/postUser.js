import { User } from "../models/user.js"
import bcrypt from "bcrypt"

export const postUser = async (req, res) => {
  try {

    const { name, email, password } = req.body
    const salt = bcrypt.genSaltSync()
    const user = await new User({ name, email, password: bcrypt.hashSync(password, salt) }).save()

    res.status(201).json({
      success: true,
      response: { userId: user._id, accessToken: user.accessToken },
      message: "User registered successfully."
    })
    
  } catch (error) {

    res.status(500).json({
      success: false,
      response: error,
      message: "Internal server error: failed to register user. Please try again later."
    })

  }
}