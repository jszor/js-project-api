import cors from "cors"
import express from "express"
import data from "./data.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!")
})

// Endpoint for getting all posts
app.get("/posts", (req, res) => {
  res.json(data)
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
