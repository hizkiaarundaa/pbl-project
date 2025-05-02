const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { ensureAuth } = require("../middleware/authMiddleware")

// Google OAuth routes
router.get("/google", authController.googleLogin) // legacy/general Google login
router.get("/google/login", authController.googleLoginWithMode("login"))
router.get("/google/register", authController.googleLoginWithMode("register"))
router.get("/google/callback", authController.googleCallback)
router.get("/failure", authController.failure)
router.get("/logout", authController.logout)
router.get("/user", ensureAuth, authController.getUser)

module.exports = router
