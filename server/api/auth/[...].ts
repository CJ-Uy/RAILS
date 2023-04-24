import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

//@ts-ignore
let provider = GoogleProvider.default({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

export default NuxtAuthHandler({
    provider
});