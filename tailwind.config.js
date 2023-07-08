import FormKitVariants from "@formkit/themes/tailwindcss";

module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
        "./src/**/*.{html,js,vue}",
        "./node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs",
    ],
    theme: {
        extend: {
            screens: {
                sm: "480px",
                md: "768px",
                lg: "976px",
                xl: "1440px",
            },
            colors: {
                "primary": { 100: "#23397D", 200: "#1B2B65" },
                "secondary": { 100: "#017EFA" },
                "offWhite": { DEFAULT: "#F8F9FF" },
                "warningRed": { DEFAULT: "#CF3A59" },
                "clearGreen": { DEFAULT: "#3AA671" },
            },
        },
    },
    plugins: [FormKitVariants],
};
