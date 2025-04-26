const { EduPost, User } = require("../models/")
const { Op } = require("sequelize")

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await EduPost.findAll()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPost = async (req, res) => {
  try {
    const post = await EduPost.findByPk(req.params.id)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create a new post
const createPost = async (req, res) => {
  try {
    const post = req.body
    const newPost = await EduPost.create(post)

    // Add 10 points to the user (search by username or displayName)
    const userIdentifier = post.username
    if (userIdentifier) {
      await User.increment(
        { points: 10 },
        {
          where: {
            [Op.or]: [{ username: userIdentifier }, { displayName: userIdentifier }],
          },
        },
      )
    }

    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getPost,
  getPosts,
  createPost,
}
