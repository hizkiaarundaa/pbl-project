const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const { User } = require("../models") // Model User

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ where: { googleID: profile.id } })
        if (existingUser) {
          return done(null, existingUser)
        }

        const newUser = await User.create({
          googleID: profile.id,
          displayName: profile.displayName,
          username: profile.emails[0].value.split("@")[0], // Menggunakan username email untuk sementara
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          points: 0,
        })

        return done(null, newUser)
      } catch (error) {
        return done(error, false)
      }
    },
  ),
)

// Serialize and deserialize the user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})
