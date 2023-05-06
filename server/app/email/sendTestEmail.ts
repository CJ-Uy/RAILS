import testEmailTemplate from "./templates/testEmailTemplate";
import { sendGmail } from "./gmailSender";
const { data: token } = await useFetch("/api/me");

export default async function sendTestEmail(email: string) {
  const template = testEmailTemplate(
    String(token.user.name)
  );
  return await sendGmail({
    template,
    to: email,
    from: `PSHS-EVC Laboratory Unit <${process.env.NUXT_MAILER_USER}>`,
    subject: "Automated Test Email",
  });
}
