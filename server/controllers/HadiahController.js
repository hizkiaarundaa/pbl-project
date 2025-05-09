
const {Hadiah,User} = require("../models")

exports.getAllHadiah = async (req, res) => {
  try {
    const hadiah = await Hadiah.findAll()

    const result = hadiah.map((item) => ({
      ...item.toJSON(),
      imageUrl: item.image ? `${process.env.BASE_URL || "http://localhost:3000"}/public/images/gift/${item.image}` : null,
    }))
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.redeemHadiah = async (req, res) => {
  const { userId, hadiahId } = req.body

  try {
    const user = await User.findByPk(userId)
    if (!user) return res.status(404).json({ message: "User not found" })

    const hadiah = await Hadiah.findByPk(hadiahId)
    if (!hadiah) return res.status(404).json({ message: "Hadiah not found" })

    if (user.points < hadiah.point) {
      return res.status(403).json({ message: "Poin tidak cukup untuk menukar hadiah ini" })
    }

    // Kurangi poin user
    user.points -= hadiah.point
    await user.save()

    res.json({ message: "Penukaran berhasil! Hadiah akan diantarkan ditempat anda.", sisaPoin: user.points })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}