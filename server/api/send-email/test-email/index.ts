import { sendGmail } from "../../app/email/gmailSender";
const { data: token } = await useFetch("/api/me");

export default defineEventHandler(async (event) => {
    const html = "<h1>Test Email</h1>";
  try {
      return await sendGmail({
        html,
        to: token.user.email,
        from: process.env.NUXT_MAILER_USER,
        subject: "Test Email",
      });
  } catch (error) {
    return sendError(event, createError(error as string));
  }
});
