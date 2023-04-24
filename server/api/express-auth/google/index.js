import passport from "~/server/passport";

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.authenticate("google", { scope: ["email", "profile"] });
