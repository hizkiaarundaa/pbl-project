const express = require("express")
const path = require("path") // pastikan path di-require
const router = express.Router()

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../pages/index.html"))
})

module.exports = router
