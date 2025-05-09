const express = require("express")
const router = express.Router()
const hadiahController = require("../controllers/HadiahController.js")

router.get("/", hadiahController.getAllHadiah)
router.post("/redeem", hadiahController.redeemHadiah)

module.exports = router
