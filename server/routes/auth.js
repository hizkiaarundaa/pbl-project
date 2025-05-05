const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { ensureAuth } = require("../middleware/authMiddleware")

// [1] Legacy/general Google login (tanpa mode eksplisit)
router.get("/google", authController.googleLogin)

// [2] Login dengan mode eksplisit (disimpan di session)
router.get("/google/login", authController.googleLoginWithMode("login"))
router.get("/google/register", authController.googleLoginWithMode("register"))

// [3] Callback dari Google OAuth
router.get("/google/callback", authController.googleCallback)

// [4] Jika login gagal
router.get("/failure", authController.failure)

// [5] Logout user
router.get("/logout", authController.logout)

// [6] Cek user yang sedang login
router.get("/user", ensureAuth, authController.getUser)

module.exports = router
