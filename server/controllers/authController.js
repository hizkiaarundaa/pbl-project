// authController.js
const passport = require("passport")
const downloadProfilePicture = require("../utils/downloadProfilePicture")
const upload = require("../utils/multerStorage")

// [1] Redirect ke Google untuk login
exports.googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
})

// [2] Callback setelah login Google selesai
exports.googleCallback = [
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  async (req, res) => {
    try {
    } catch (error) {}
    // Hanya jika login berhasil
    res.redirect("http://localhost:5173/auth/google/callback?logged_in=true") // Tambahkan parameter logged_in
  },
]

// [3] Jika login gagal (termasuk user membatalkan login)
exports.failure = (req, res) => {
  res.status(401).json({ message: "Login gagal atau dibatalkan" })
  res.redirect("http://localhost:5173") // Redirect ke homepage jika login gagal
}

// [4] Logout user
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.clearCookie("connect.sid") // Penting untuk hapus cookie session
    res.json({ message: "Logged out" })
  })
}

// [5] Cek status login user
exports.getUser = (req, res) => {
  if (req.isAuthenticated() && req.user) {
    return res.json(req.user) // Kirim data user valid
  }
  return res.status(401).json({ message: "Unauthorized" })
}
