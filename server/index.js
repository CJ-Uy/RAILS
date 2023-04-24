// --- IMPORTS --- //
require("dotenv").config() // This allows the env file to be read

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const express = require("express")
// const session = require("express-session")
const passport = require("passport")
const port = process.env.SERVER_PORT // The server port number is taken from the .env file

const app = express() // Create the express app

// app.use(
// 	session({
// 		secret: "Your Secret Key",
// 		resave: true,
// 		saveUninitialized: true
// 	}) // TODO: Read the express-session documentation to fix deprecated issues
// )

app.use(passport.initialize())
app.use(passport.session())

// Importing other scripts
require("./scripts/auth.js")
// --- END OF IMPORTS --- //

// --- BASE SERVER SETUP --- //
app.listen(port, () => {
	console.log(
		`\n(-ω-)ゞ Server is now online!\nListening at http://localhost:${port}\n`
	)
})

app.get("/", (req, res) => {
	res.send("<a href='/auth/google'>LOGIN WITH GOOGLE</a>")
})
// --- END OF BASE SERVER SETUP --- //

// --- GOOGLE OAUTH LOGIN --- //
function isLoggedIn(req, res, next) {
	req.user
		? next()
		: res.send("<h1>UNAUTHORIZED<br><a href='/'>Go back home</a><h1>") // If the user is logged in, continue to the next function, otherwise send a 401 error meaning unauthorized
}

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
)

app.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "/dashboard",
		failureRedirect: "/auth/failure"
	})
)

// Handle the success and error situations
app.get("/dashboard", isLoggedIn, (req, res) => {
	res.send("<h1>SUCCESS</h1>")
	const { displayName, family_name, given_name, email, photos } = req.user
	const photo = photos[0].value // TODO: Find what to do if no photo

	// Create a new Student in the database
	create_student(email, given_name, family_name, photo)
		.then(async () => {
			await prisma.$disconnect()
		})
		.catch(async (e) => {
			console.error(e)
			await prisma.$disconnect()
			process.exit(1)
		})
})

app.get("/auth/failure", (req, res) => {
	res.send("<h1>Something when wrong logging in to google...</h1>")
	res.send("<a href='/'>Return to HomePage</a>")
})
// --- END OF GOOGLE OAUTH LOGIN --- //

// --- CREATING NEW STUDENT USER --- //
// TODO: Only allow the evc emails
async function create_student(email, firstname, lastname, photo) {
	await prisma.students.create({
		data: {
			Email: email,
			Firstname: firstname,
			Lastname: lastname,
			Photo_Link: photo
		}
	})
}
