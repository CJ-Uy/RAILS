/* eslint-disable require-await */
// Showing timeout error now
import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    pages: {
        // Change the default behavior to use "/login" as the path for the sign-in page
        signIn: "/login",
    },
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
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                return (
                    profile.email_verified &&
                    profile.email.endsWith("@evc.pshs.edu.ph")
                );
            }
            return true; // Do different verification for other providers that don't have `email_verified`
        },
        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async ({ token, user, profile }) => {
            // eslint-disable-next-line no-unneeded-ternary
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.family_name = profile.family_name;
                token.given_name = profile.given_name;
            }
            return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({ session, token }) => {
            (session as any).id = token.id;
            (session as any).family_name = token.family_name;
            (session as any).given_name = token.given_name;
            return Promise.resolve(session);
        },
    },
});
