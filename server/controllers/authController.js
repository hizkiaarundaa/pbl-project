require("dotenv").config()
// authController.js
const passport = require("passport")
const {User} = require("../models") // Import User model

// [1] Legacy: Redirect ke Google untuk login (tanpa mode)
exports.googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
})

// [2] Baru: Redirect ke Google untuk login/register dengan mode
exports.googleLoginWithMode = (mode) => (req, res, next) => {
  // Simpan mode di session agar bisa dibaca di callback
  req.session.authMode = mode
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next)
}

// [3] Callback setelah login Google selesai
exports.googleCallback = [
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  async (req, res) => {
    try {
      // Ambil mode dari session (jika ada)
      const mode = req.session.authMode

      // Hapus mode dari session setelah digunakan
      if (mode) delete req.session.authMode

      // req.user sudah diisi oleh passport (user yang baru login/register)
      // Cek user di database berdasarkan googleId
      const googleId = req.user.googleId
      const user = await User.findOne({ googleId })

      if (mode === "login") {
        // Jika mode login, user harus sudah ada di database
        if (!user) {
          // User belum pernah register, tolak login
          return res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?logged_in=false&reason=not_registered`)
        }
        // User sudah ada, lanjutkan login (passport sudah handle session)
      }

      if (mode === "register") {
        // Jika mode register, user tidak boleh sudah ada di database
        if (user) {
          // User sudah pernah register, tolak register ulang
          return res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?logged_in=false&reason=already_registered`)
        }
        // User belum ada, passport-google-oauth akan otomatis membuat user baru
        // (atau kamu bisa handle manual di strategy)
      }

      // Jika mode tidak ada (legacy) atau lolos pengecekan, lanjutkan
      res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?logged_in=true`)
    } catch (error) {
      console.error("Google auth callback error:", error);
      return res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?logged_in=false&reason=server_error`);
    }
  },
]

// [4] Jika login gagal (termasuk user membatalkan login)
exports.failure = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?logged_in=false&reason=auth_failed`)
}

// [5] Logout user
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.clearCookie("connect.sid") // Penting untuk hapus cookie session
    res.json({ message: "Logged out" })
  })
}

// [6] Cek status login user
exports.getUser = (req, res) => {
  if (req.isAuthenticated() && req.user) {
    return res.json(req.user) // Kirim data user valid
  }
  return res.status(401).json({ message: "Unauthorized" })
}
