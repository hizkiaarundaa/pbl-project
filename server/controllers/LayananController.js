const { User, Layanan } = require("../models")
const { Op } = require("sequelize")
const createLayanan = async (req, res) => {
  try {
    const { username, alamat, sampahTotal } = req.body
    const newLayanan = await Layanan.create({ username, alamat, sampahTotal })
    if (username) {
      await User.increment(
        { points: 25 },
        {
          where: {
            [Op.or]: [{ username }, { displayName: username }],
          },
        },
      )
    }

    res.status(201).json(newLayanan)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


module.exports = {createLayanan}