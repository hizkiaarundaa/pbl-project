const fs = require("fs")
const path = require("path")
const axios = require("axios")

async function downloadProfilePicture(url, googleID) {
  const filename = `${googleID}.jpg`
  const dirPath = path.join(__dirname, "../public/images/user")
  const filePath = path.join(dirPath, filename)

  await fs.promises.mkdir(dirPath, { recursive: true })

  const response = await axios.get(url, { responseType: "arraybuffer" })
  await fs.promises.writeFile(filePath, response.data)

  return `/images/user/${filename}`
}

module.exports = downloadProfilePicture
