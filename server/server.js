require("dotenv").config()
const express = require("express")
const session = require("express-session")
const passport = require("passport")
const cors = require("cors")
const { sequelize } = require("./models")
const path = require("path")
require("./config/passport")
const corsOptions = require("./config/corsOptions.js")
const app = express()

// routes
const rootRoutes = require("./routes/root.js")
const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user.js")
const eduPostsRoutes = require("./routes/edupost.js")
const layananRoutes = require("./routes/layanan.js")
const hadiahRoutes = require("./routes/hadiah.js")

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use("/public", express.static(path.join(__dirname, "public")))

// google middleware
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
app.use("/", rootRoutes)
app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/eduposts", eduPostsRoutes)
app.use("/layanan", layananRoutes)
app.use("/hadiah", hadiahRoutes)
// Sinkronisasi model Sequelize ke database
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000
  console.log(`✅ Database synced`)
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
})
