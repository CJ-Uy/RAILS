import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  providers: [
    // @ts-ignore
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/user.birthday.read",
      ],
    }),
  ],
  callbacks: {
    // eslint-disable-next-line require-await
    async signIn(user) {
      console.log("user:", user); // TODO: Figure out why this can't be accessed anywhere except here (maybe put database code here instead of in me.get.ts)
      return true; // Return `true` to allow sign in
    },
  },
});
