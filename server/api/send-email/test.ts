import sendTestEmail from "../../app/email/sendTestEmail";

export default defineEventHandler(async (event) => {
    try {
        return await sendTestEmail("charlesjoshuauy@gmail.com")
    } catch (error) {
        return sendError(event, createError(error as string))
    }
})