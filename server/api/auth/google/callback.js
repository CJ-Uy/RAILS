import passport from "~/server/passport";

passport.authenticate("google", {
	successRedirect: "/dashboard",
	failureRedirect: "/failure"
});
