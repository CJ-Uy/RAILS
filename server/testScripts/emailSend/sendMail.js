import nodemailer from "nodemailer";
import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
OAuth2_client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

export function sendMail(mailOptions) {
  //mailOptions{from, to, subject, html}
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken,
    },
  });

  transport.sendMail(mailOptions, function (error, result) {
    if (error) {
      console.log("ERROR", error);
    } else {
      console.log("SUCCESS", result);
    }
    transport.close();
  });
}
