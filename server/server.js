require("dotenv").config()
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")
const { sequelize } = require("./models")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
require("./config/passport")
const corsOptions = require("./config/corsOptions.js")
const app = express()

// Parsing JSON dari body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Mengizinkan permintaan dari frontend React (localhost:5173) + kirim cookie
app.use(cors(corsOptions))

// Mengizinkan akses file statis (misal gambar profil di public/images)
app.use(express.static("public"))

// Inisialisasi session (wajib sebelum passport.session())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

// Routing
app.use("/auth", authRoutes)
app.use("/user", userRoutes)

// Sinkronisasi model Sequelize ke database
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000
  console.log(`✅ Database synced`)
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
})
