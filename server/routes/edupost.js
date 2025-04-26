const express = require("express")
const router = express.Router()

const { getPosts, getPost, createPost } = require("../controllers/EduPostController")

// GET /api/eduposts/:id - Ambil satu post edukasi berdasarkan ID
router.get("/:id", getPost)

// GET /api/eduposts - Ambil semua post edukasi
router.get("/", getPosts)

// POST /api/eduposts - Buat post edukasi baru
router.post("/", createPost)

module.exports = router
