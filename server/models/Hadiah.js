// models/hadiah.js
module.exports = (sequelize, DataTypes) => {
  const Hadiah = sequelize.define("Hadiah", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  return Hadiah
}
