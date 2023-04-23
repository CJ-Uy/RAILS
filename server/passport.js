import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:3000/api/google/callback", // This for some reason doesnt work if its from the
			passReqToCallback: true
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		function (request, accessToken, refreshToken, profile, done) {
			//? save to databe
			return done(null, profile);
		}
	)
);

export default passport;
