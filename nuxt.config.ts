// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    components: true,
    devtools: { enabled: true },

    modules: [
        // https://github.com/jurassicjs/nuxt-mailer (Nodemailer wrapper for email functionality)
        "nuxt-mailer",
        // https://nuxt.com/modules/fontaine (Optimized font fallbacks to keep layout consistent)
        "@nuxtjs/fontaine",
        // https://nuxt.com/modules/nuxt-auth (Next-auth wrapper for user authentication)
        "@sidebase/nuxt-auth",
        // CSS and styling modules
        // "@nuxtjs/tailwindcss", // https://nuxt.com/modules/tailwindcss (CSS class based framework)
        // "@nuxtjs/color-mode", // https://nuxt.com/modules/color-mode (dark mode and other themes)
        // https://ui.nuxtlabs.com/getting-started (Component Library) contains the above 2
        "@nuxt/ui", // main ui component library
        "vuetify-nuxt-module", // ui library for more niche components
        // Optimization modules
        // https://image.nuxt.com/ (Image loading optimization)
        "@nuxt/image",
        // https://nuxt.com/modules/icon (Icons from iconify) [DATASET: https://icones.js.org/]
        "nuxt-icon",
        // https://nuxt.com/modules/icons Automatically import SVG icons from assets/icons
        "nuxt-icons",
        // Forms framework
        // https://formkit.com/ (Vue forms framework)
        "@formkit/nuxt",
        "@nuxt/image",
        "nuxt-scheduler", // Scheduler of events
        // Useful but not yet used modules
        "@vueuse/nuxt", // https://nuxt.com/modules/vueuse (Vue composition utilities)
        // "@nuxtjs/device", // https://nuxt.com/modules/device (Device type detection)
        // Add website optimizations (https://nuxt.com/modules?category=Performance)
        // Add SEO [search engine optimizations] when complete (https://nuxt.com/modules/seo-kit)
        "@nuxtjs/seo",
    ],

    build: {
        transpile: ["@vuepic/vue-datepicker"], // https://vue3datepicker.com/ (datepicker calendar and time vue components)
    },

    // NUXT-AUTH CONFIGURATION
    auth: {
        isEnabled: process.env.AUTH_ENABLED === "true", // The module is enabled. Change this to disable the module
        origin: process.env.ORIGIN,
        
        // (for new networks add .nip.io to URI to https://console.cloud.google.com/apis/credentials?project=rails-382915)
        enableGlobalAppMiddleware: true, // Whether to add a global authentication middleware that will protect all pages without exclusion
        basePath: "/api/auth", // The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
        defaultProvider: "google", // Select the default-provider to use when `signIn` is called. Setting this here will also effect the global middleware behavior: E.g., when you set it to `github` and the user is unauthorized, they will be directly forwarded to the Github OAuth page instead of seeing the app-login page

        /*
    globalMiddlewareOptions: {
        // TODO: Further testing needed on the settings below
        // Whether to allow access to 404 pages without authentication. Set this to `false` to force users to sign-in before seeing `404` pages. Setting this to false may lead to vue-router problems (as the target page does not exist)
        // allow404WithoutAuth: false,
        // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path. Note: You also need to set the global `addDefaultCallbackUrl` setting to `false` if you want to fully disable this for the global middleware.
        // addDefaultCallbackUrl: true,
    },
    addDefaultCallbackUrl: false, // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path.
    // TODO: Figure out the best values for these settings below
    // enableSessionRefreshPeriodically: false, // Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
    // enableSessionRefreshOnWindowFocus: true, // Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
    */
    },

    ui: {
        global: true,
        icons: "all",
    },

    colorMode: {
        preference: "light",
    },

    formkit: {
        configFile: "./formkit.config.js",
    },

    // NUXT-MAILER CONFIGURATION [DON'T REMOVE]
    runtimeConfig: {
        mailerUser: "",
        mailerPass: "",
        mailerLog: "",
    },
});
