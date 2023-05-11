/* eslint-disable require-await */
// Showing timeout error now
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
            timeout: 10000,
        }),
    ],
    callbacks: {
        async signIn(user) {
            console.log("user:", user); // TODO: Figure out why this can't be accessed anywhere except here (maybe put database code here instead of in me.get.ts)
            return true; // Return `true` to allow sign in
        },
        // // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        // jwt: async ({ token, user }) => {
        //     // eslint-disable-next-line no-unneeded-ternary
        //     const isSignIn = user ? true : false;
        //     if (isSignIn) {
        //         token.id = user ? user.user.id || "" : "";
        //         token.family_name = user ? (user as any).user.family_name || "" : "";
        //         token.given_name = user ? (user as any).user.given_name || "" : "";
        //     }
        //     return Promise.resolve(token);
        // },
        // // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        // session: async ({ session, token }) => {
        //     (session as any).id = token.id;
        //     (session as any).family_name = token.family_name;
        //     (session as any).given_name = token.given_name;
        //     return Promise.resolve(session);
        // },
    },
});
