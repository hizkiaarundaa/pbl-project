require("dotenv").config()
const passport = require("passport")
const { User } = require("../models")

// [1] Inisialisasi login Google
exports.googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
})

// [2] Login dengan mode (login/register), disimpan di session
exports.googleLoginWithMode = (mode) => (req, res, next) => {
  if (mode !== "login" && mode !== "register") {
    return res.status(400).json({ message: "Invalid mode" })
  }

  req.session.authMode = mode
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next)
}

// [3] Callback setelah login Google
exports.googleCallback = [
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(
          `${process.env.CLIENT_URL}/auth/google/callback?logged_in=false&reason=${encodeURIComponent("no_user")}`,
        )
      }

      const mode = req.session.authMode
      if (mode) delete req.session.authMode // Bersihkan session

      const googleId = req.user.googleId
      const email = req.user.email

      const user = await User.findOne({ googleId } )

      if (mode === "login") {
        if (!user) {
          // Belum pernah register
          return res.redirect(`${process.env.CLIENT_URL}/register?google=true&email=${encodeURIComponent(email)}`)
        }
        // Sudah terdaftar, lanjutkan
      }

      if (mode === "register") {
        if (user) {
          // Sudah pernah register
          return res.redirect(
            `${process.env.CLIENT_URL}/login?google=true&email=${encodeURIComponent(email)}&reason=${encodeURIComponent(
              "already_registered",
            )}`,
          )
        }
        // Passport strategy akan handle pembuatan user baru
      }

      // Jika tidak ada mode, atau validasi lolos
      return res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?logged_in=true`)
    } catch (error) {
      console.error("Google auth callback error:", error)
      return res.redirect(
        `${process.env.CLIENT_URL}/auth/google/callback?logged_in=false&reason=${encodeURIComponent("server_error")}`,
      )
    }
  },
]

// [4] Jika login gagal
exports.failure = (req, res) => {
  res.redirect(
    `${process.env.CLIENT_URL}/auth/google/callback?logged_in=false&reason=${encodeURIComponent("auth_failed")}`,
  )
}

// [5] Logout user
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.clearCookie("connect.sid")
    res.json({ message: "Logged out" })
  })
}

// [6] Cek status login user
exports.getUser = (req, res) => {
  if (req.isAuthenticated() && req.user) {
    return res.json(req.user)
  }
  return res.status(401).json({ message: "Unauthorized" })
}
