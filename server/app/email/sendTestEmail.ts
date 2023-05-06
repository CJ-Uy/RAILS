import testEmailTemplate from "./templates/testEmailTemplate";
import { sendGmail } from "./gmailSender";

export default async function sendTestEmail(email: string) {
  const template = testEmailTemplate(
    "Juan Dela Cruz"
  );
  return await sendGmail({
    template,
    to: email,
    from: `PSHS-EVC Laboratory Unit <${process.env.NUXT_MAILER_USER}>`,
    subject: "Automated Test Email",
  });
}
