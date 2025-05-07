module.exports = (sequelize, DataTypes) => {
  const Layanan = sequelize.define("Layanan", {
    username: {
      type: DataTypes.STRING,
      allowNull:false
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sampahTotal: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  })

  return Layanan
}
