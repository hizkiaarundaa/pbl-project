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
        const email = profile.emails[0].value
        const googleId = profile.id
        const displayName = profile.displayName
        const photo = profile.photos[0].value

        const user = await User.findOne({ where: { googleId } })
        if (user) return done(null, user)

        return done(null, {
          googleId,
          email,
          displayName,
          photo,
        })
      } catch (error) {
        return done(error, null)
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
