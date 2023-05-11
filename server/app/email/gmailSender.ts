import { EmailTemplate } from "./types/emailTypes";
import { useMailer } from "#mailer";

type SendMail = {
    template: EmailTemplate;
    to: string;
    from: string;
    subject: string;
};

export async function sendGmail(request: SendMail) {
    const mailService = useMailer();

    const gmailTransporter = mailService.customTransporter({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: String(process.env.NUXT_MAILER_USER),
            pass: String(process.env.NUXT_MAILER_PASS),
        },
    });

    return await mailService.sendMail({
        requestId: "test-key",
        options: {
            to: request.to,
            subject: request.subject,
            text: request.template.text,
            html: request.template.html,
        },
        transporter: gmailTransporter,
    });
}
