const multer = require("multer")
const fs = require("fs-extra")
const path = require("path")

const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    if (!req.user) return callback(new Error("Unauthorized"), null)

    const uploadDir = path.join(__dirname, "../public/images", req.user.username)
    await fs.ensureDir(uploadDir)
    callback(null, uploadDir)
  },
  filename: (req, file, callback) => {
    callback(null, "profile.jpg") // Semua gambar disimpan dengan nama "profile.jpg"
  },
})

const upload = multer({ storage })

module.exports = upload
