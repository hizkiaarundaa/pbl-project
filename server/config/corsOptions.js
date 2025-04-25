const allowOrigins = [
  "https://www.yoursite.com",
  "http://localhost:5173",
  "http://localhost:6969",
  "https://lh3.googleusercontent.com",
]
const corsOptions = {
  origin: (origin, cb) => {
    if (allowOrigins.indexOf(origin) !== -1 || !origin) {
      cb(null, true)
    } else {
      cb(new Error("Not allowed by CORS"))
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
}
module.exports = corsOptions
