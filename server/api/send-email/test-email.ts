import { sendMail } from "../../serverScripts/sendMail.js"

export default eventHandler(async event => {
    const { data: token } = await useFetch("/api/me");

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: token.user.email,
        subject: "Automated Test Email",
        html: "<h1>Test Email</h1><p>This is an automated test email</p>"
    }

    try {
        sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
    
});