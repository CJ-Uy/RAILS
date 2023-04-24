import { defineNuxtPlugin } from "#app";
import GAuth from "vue3-google-oauth2";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(GAuth, {
		clientId: process.env.GOOGLE_CLIENT_ID,
		scope: "email",
		prompt: "consent",
		fetch_basic_profile: false
	});
})