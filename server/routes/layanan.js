const express = require("express")
const router = express.Router()
const layananController = require("../controllers/LayananController.js")

router.post("/",layananController.createLayanan)
module.exports = router