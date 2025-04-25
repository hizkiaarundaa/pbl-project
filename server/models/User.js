module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    googleID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Google ID harus unik
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Username harus unik
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Email harus unik
    },
    photo: {
      type: DataTypes.STRING, // URL atau path foto profil
    },
    bio: {
      type: DataTypes.STRING,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Poin defaultnya 0
    },
  })

  // Pastikan untuk mengembalikan model
  return User
}
