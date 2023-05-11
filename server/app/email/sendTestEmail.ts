import testEmailTemplate from "./templates/testEmailTemplate";
import { sendGmail } from "./gmailSender";

export default async function sendTestEmail(name: string, email: string) {
    const template = testEmailTemplate(name);
    return await sendGmail({
        template,
        to: email,
        from: `PSHS-EVC Laboratory Unit <${process.env.NUXT_MAILER_USER}>`,
        subject: "Automated Test Email",
    });
}
