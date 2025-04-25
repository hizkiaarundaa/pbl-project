const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { ensureAuth } = require("../middleware/authMiddleware") // Pastikan user sudah terautentikasi

// Update user profile
router.put("/update", ensureAuth, userController.updateUser)

module.exports = router
