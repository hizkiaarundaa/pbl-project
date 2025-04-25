const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const userPath = path.join("public/images", req.user.username)
    await fs.promises.mkdir(userPath, { recursive: true })
    cb(null, userPath)
  },
  filename: (req, file, cb) => {
    cb(null, "profile.jpg")
  },
})

module.exports = multer({ storage })
