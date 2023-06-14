/*
This is the nuxt config file. Here the configuration for the nuxt app and its modules is set.

*/
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@sidebase/nuxt-auth", // https://nuxt.com/modules/nuxt-auth (Next-auth wrapper for user authentication)
        "@nuxtjs/tailwindcss", // https://nuxt.com/modules/tailwindcss (CSS class based framework)
        "nuxt-mailer", // https://github.com/jurassicjs/nuxt-mailer (Nodemailer wrapper for email functionality)
        "@nuxtjs/fontaine", // https://nuxt.com/modules/fontaine (Optimized font fallbacks to keep layout consistent)
        "@nuxt/image-edge", // https://v1.image.nuxtjs.org/ (Image loading optimization)
        "@formkit/nuxt", // https://formkit.com/ (Vue forms framework)

        // Useful but not yet used modules
        "@vueuse/nuxt", // https://nuxt.com/modules/vueuse (Vue composition utilities)
        "@invictus.codes/nuxt-vuetify", // https://nuxt.com/modules/nuxt-vuetify AND https://vuetifyjs.com/en/ (UI Library) [maybe try daisy UI instead]
        "@nuxt/content", // https://content.nuxtjs.org/ (parses markdown and other files for content)
        "@nuxtjs/device", // https://nuxt.com/modules/device (Device type detection)
        // Add website optimizations (https://nuxt.com/modules?category=Performance)
        // Add SEO [search engine optimizations] when complete (https://nuxt.com/modules/seo-kit)
    ],

    /*
    FONTAINE CONFIGURATION
        If you are using a Google font or you don't have a @font-face declaration
        for a font you're using, you can declare them here. In most cases this is not necessary.

        fontMetrics: {
            fonts: ['Inter', { family: 'Some Custom Font', src: '/path/to/custom/font.woff2' }],
        }, 
    */

    build: {
        transpile: ["@vuepic/vue-datepicker"], // https://vue3datepicker.com/ (datepicker calendar and time vue components)
    },

    // VUETIFY CONFIGURATION
    vuetify: {
        /* vuetify options */
        vuetifyOptions: {
            // TODO: list all vuetify options
        },
        moduleOptions: {
            /* nuxt-vuetify module options */
            treeshaking: true,
            useIconCDN: true,
            /* vite-plugin-vuetify options */
            styles: true,
            autoImport: true,
        },
    },

    formkit: {
        configFile: "./formkit.config.js",
    },

    // NUXT-MAILER CONFIGURATION [DONT'T REMOVE]
    runtimeConfig: {
        mailerUser: "",
        mailerPass: "",
        mailerLog: "",
    },

    // NUXT-AUTH CONFIGURATION
    auth: {
        isEnabled: true, // The module is enabled. Change this to disable the module

        enableGlobalAppMiddleware: true, // Whether to add a global authentication middleware that will protect all pages without exclusion

        // Change to  http://192.168.88.188:3000 somehow ?
        origin: "http://localhost:3000", // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`

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

    // NUXT-DEVTOOLS CONGIGURATION
    devtools: {
        enabled: true,
    },
});
