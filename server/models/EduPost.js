module.exports = (sequelize, DataTypes) => {
  const EduPost = sequelize.define("EduPost", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNullL: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  return EduPost
}
