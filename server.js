import cors from "cors"
import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import dotenv from "dotenv"
import data from "./data.json"
import { Thought } from "./models/thought.js"

// Set up dotenv
dotenv.config()

// Set up mongoose
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/happy-thoughts-api"
mongoose.connect(mongoUrl)

// Set up express
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)
  res.json({
    message: "Welcome to the Happy Thoughts API",
    endpoints: endpoints
  })
})

// Define thought schema
const thoughtSchema = new mongoose.Schema({
  message: { type: String, required: true },
  hearts: { type: Number, default: 0 },
}, 
{ 
  timestamps: { createdAt: true, updatedAt: false }
})

const Thought = mongoose.model("Thought", thoughtSchema)

// Seed database
if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Thought.deleteMany({})
    data.forEach(({ message, hearts }) => {
      new Thought({ message, hearts }).save()
    })
  }
  seedDatabase()
}

// Endpoint for getting all thoughts
app.get("/thoughts", async (req, res) => {
  const { hearts } = req.query;

  const query = {}

  if (hearts) {
    query.hearts = hearts
  }

  try {
    const filteredThoughts = await Thought.find(query)

    if (filteredThoughts.length === 0) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No thoughts found for given query. Please try again with a different query"
      })
    }
    res.status(200).json({
      success: true,
      response: filteredThoughts,
      message: "Success"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch thoughts"
    })
  }

})

// Endpoint for getting a specific thought 
app.get("/thoughts/:id", (req, res) => {
  const thought = data.find((thought) => thought.id === req.params.id);
  res.json(thought);
})

// Endpoint for posting
app.post("/thoughts", async (req, res) => {
  const { message } = req.body

  try {
    const newThought = await new Thought({ message }).save()
    res.status(201).json({
      success: true,
      response: newThought,
      message: "Thought created successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Could not create thought"
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
