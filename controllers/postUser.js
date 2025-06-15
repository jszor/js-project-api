import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

export const postUser = async (req, res) => {
  try {

    const { name, email, password } = req.body

    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = await new User({ name, email, password: hashedPassword }).save()

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(201).json({
      success: true,
      response: { 
        userId: newUser._id, 
        name: newUser.name,
        accessToken
      },
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