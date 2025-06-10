import cors from "cors"
import express from "express"
import data from "./data.json"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"

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

// Define post schema
const postSchema = new mongoose.Schema({
  id: Number,
  message: String,
  hearts: Number,
  createdAt: String,
  __v: Number
})

const Post = mongoose.model("Post", postSchema)

// Seed database
if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Post.deleteMany({})
    data.forEach(post => {
      new Post(post).save()
    })
  }
  seedDatabase()
}

// Endpoint for getting all posts
app.get("/posts", async (req, res) => {
  const { hearts } = req.query;

  const query = {}

  if (hearts) {
    query.hearts = hearts
  }

  try {
    const filteredPosts = await Post.find(query)

    if (filteredPosts.length === 0) {
      return res.status(404).json({
        success: false,
        response: [],
        message: "No posts found for given query. Please try again with a different query"
      })
    }
    res.status(200).json({
      success: true,
      response: filteredPosts,
      message: "Success"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch posts"
    })
  }

})

// Endpoint for getting a specific post 
app.get("/posts/:id", (req, res) => {
  const post = data.find((post) => post.id === req.params.id);
  res.json(post);
})

// Endpoint for posting
app.post("/posts", async (req, res) => {
  const { message } = req.body

  try {
    const newPost = await new Post({ message }).save()
    res.status(201).json({
      success: true,
      response: newPost,
      message: "Post created successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Could not create post"
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
