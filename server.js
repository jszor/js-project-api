import cors from "cors"
import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import dotenv from "dotenv"

import { getThoughts } from "./controllers/getThoughts.js"
import { getThought } from "./controllers/getThought.js"
import { postThought } from "./controllers/postThought.js"
import { patchThought } from "./controllers/patchThought.js"
import { patchThoughtLikes } from "./controllers/patchThoughtLikes.js"
import { deleteThought } from "./controllers/deleteThought.js"
import { postUser } from "./controllers/postUser.js"
import { loginUser } from "./controllers/loginUser.js"
import { getUserData } from "./controllers/getUserData.js"
import { authenticateUser } from "./middleware/authenticateUser.js"

dotenv.config()

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/happy-thoughts-api"
mongoose.connect(mongoUrl)

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// List all API endpoints for documentation

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)
  res.json({
    message: "Welcome to the Happy Thoughts API",
    endpoints: endpoints
  })
})

// Set up endpoints 

// Endpoint for getting all thoughts
app.get("/thoughts", authenticateUser, getThoughts)

// Endpoint for getting a specific thought by id
app.get("/thoughts/:id", authenticateUser, getThought)

// Endpoint for posting a thought
app.post("/thoughts", authenticateUser, postThought)

// Endpoint for updating a thought
app.patch("/thoughts/:id", authenticateUser, patchThought)

// Endpoint for toggling likes
app.patch("/thoughts/:id/likes", authenticateUser, patchThoughtLikes)

// Endpoint for deleting a thought
app.delete("/thoughts/:id", authenticateUser, deleteThought)

// Endpoint for registering a user
app.post("/users/register", postUser)

// Endpoint for logging in a user
app.post("/users/login", loginUser)

// Endpoint for retrieving the data of an authenticated user
app.get("/users/me", authenticateUser, getUserData)

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
