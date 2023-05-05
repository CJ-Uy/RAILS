import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";

export default NuxtAuthHandler({
  providers: [
    //@ts-ignore
    GoogleProvider.default({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // scope: [
        //     "openid",
        //     "profile",
        //     "email",
        //     "address",
        //     "phone",
        // ], 
    }),
  ],
});
