// --- IMPORTS --- //
require("dotenv").config(); //This allows the env file to be read

const express = require("express");
const session = require("express-session")
const passport = require("passport");
const port = process.env.SERVER_PORT; //The server port number is taken from the .env file

const app = express(); //Create the express app
app.use(
  session({ secret: "Your Secret Key", resave: true, saveUninitialized: true }) //TODO: Read the express-session documentation to fix deprecated issues
);
app.use(passport.initialize());
app.use(passport.session());

require("./scripts/auth.js");
// --- END OF IMPORTS --- //



// --- BASE SERVER SETUP --- //
app.listen (port, () => {
    console.log(
      `\n(-ω-)ゞ Server is now online!\nListening at http://localhost:${port}\n`
    );
})

app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>LOGIN WITH GOOGLE</a>");
});
// --- END OF BASE SERVER SETUP --- //



// --- GOOGLE OAUTH LOGIN --- //
function isLoggedIn(req, res, next) {
  req.user ? next() : res.send("<h1>UNAUTHORIZED<br><a href='/'>Go back home</a><h1>"); //If the user is logged in, continue to the next function, otherwise send a 401 error meaning unauthorized
}

app.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/failure",
  })
);

//Handle the success and error situations
app.get("/dashboard", isLoggedIn, (req, res) => { 
  res.send("<h1>SUCCESS</h1>");
  const { displayName, emails } = req.user;
  const email = emails[0].value;

  // Use the retrieved user details
  console.log(`Welcome ${displayName}! Your email is ${email}.`); //Idk why i cant res.send these details
});

app.get("/auth/failure", (req, res) => {
  res.send("<h1>Something when wrong logging in to google...</h1>")
  res.send("<a href='/'>Return to HomePage</a>")
});
// --- END OF GOOGLE OAUTH LOGIN --- //