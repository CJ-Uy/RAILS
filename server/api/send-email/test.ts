import sendTestEmail from "../../app/email/sendTestEmail";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    return await sendTestEmail(String(body.name), String(body.email));
  } catch (error) {
    return sendError(event, createError(error as string));
  }
});
