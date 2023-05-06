import sendTestEmail from "../../app/email/sendTestEmail";
const { data: token } = await useFetch("/api/me");

const email = String(token.user.email)

export default defineEventHandler(async (event) => {
    console.log(email)
    try {
        return await sendTestEmail(email)
    } catch (error) {
        return sendError(event, createError(error as string))
    }
})