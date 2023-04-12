require("dotenv").config() // This allows the env file to be read

const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth2").Strategy

passport.use(
  new GoogleStrategy(
		{
      clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:5000/google/callback", // This for some reason doesnt work if its from the
			passReqToCallback: true
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		function (request, accessToken, refreshToken, profile, done) {
			// TODO: save user to database
			return done(null, profile)
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})
