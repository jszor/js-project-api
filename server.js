import cors from "cors"
import express from "express"
import data from "./data.json"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/posts"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const Post = 

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app)
  res.json({
    message: "Welcome to the Happy Thoughts API",
    endpoints: endpoints
  })
})

// Endpoint for getting all posts
app.get("/posts", (req, res) => {
  
  const { hearts } = req.query;
  
  let filteredData = data;

  if (hearts) {
    filteredData = filteredData.filter(post => post.hearts === +hearts);
  }

  res.json(filteredData)
})

// Endpoint for getting a specific post 
app.get("/posts/:id", (req, res) => {
  const post = data.find((post) => post.id === req.params.id);
  res.json(post);
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
