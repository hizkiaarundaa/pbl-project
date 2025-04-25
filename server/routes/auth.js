const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { ensureAuth } = require("../middleware/authMiddleware")
router.get("/google", authController.googleLogin)
router.get("/google/callback", authController.googleCallback)
router.get("/failure", authController.failure)
router.get("/logout", authController.logout)
router.get("/user", ensureAuth, authController.getUser)

module.exports = router
