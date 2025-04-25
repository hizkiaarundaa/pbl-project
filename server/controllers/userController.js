const { User } = require("../models")
const fs = require("fs")
const path = require("path")
const multer = require("multer")

// Middleware multer dengan storage dinamis untuk upload foto profil
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

const upload = multer({ storage })

// Update user profile (foto, bio, atau data lainnya)
exports.updateUserProfile = upload.single("photo")

exports.updateUser = async (req, res) => {
  try {
    const { bio, username } = req.body

    const user = await User.findByPk(req.user.id)
    if (user) {
      user.username = username || user.username
      user.bio = bio || user.bio
      if (req.file) {
        user.photo = `/images/${req.user.username}/profile.jpg`
      }
      await user.save()
      return res.json(user)
    }

    return res.status(404).json({ message: "User not found" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Terjadi kesalahan saat memperbarui profil" })
  }
}
