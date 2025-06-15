import { Thought } from "../models/thought.js"

export const getThoughts = async (req, res) => {
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
}