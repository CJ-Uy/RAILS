require("dotenv").config()
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(
	process.env.GMAIL_CLIENT_ID,
	process.env.GMAIL_CLIENT_SECRET,
	"https://developers.google.com/oauthplayground"
)
OAuth2_client.setCredentials({
	refresh_token: process.env.GMAIL_REFRESH_TOKEN
})

function send_mail(name, recipient) {
	const accessToken = OAuth2_client.getAccessToken()

	const transport = nodemailer.createTransport({
		service: "gmail",
		tls: {
			rejectUnauthorized: false
		},
		auth: {
			type: "OAuth2",
			user: process.env.GMAIL_USER,
			clientId: process.env.GMAIL_CLIENT_ID,
			clientSecret: process.env.GMAIL_CLIENT_SECRET,
			refreshToken: process.env.GMAIL_REFRESH_TOKEN,
			accessToken
		}
	})

	const mail_options = {
		from: `PSHS-EVC Laboratory Unit <${process.env.GMAIL_USER}>`,
		to: recipient,
		subject: get_subject(),
		html: get_html_message(name)
	}

	transport.sendMail(mail_options, function (error, result) {
		if (error) {
			console.log("ERROR", error)
		} else {
			console.log("SUCCESS", result)
		}
		transport.close()
	})
}

function get_subject() {
	return "Test Email"
}

function get_html_message(name) {
	return `<h1>Hello 2 ${name}</h1>`
}

send_mail("Tempest", "charlesjoshuauy@gmail.com")
