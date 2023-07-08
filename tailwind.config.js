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
                primary: "#23397D",
                primaryDark: "#1B2B65",
                secondary: "#017EFA",
                offWhite: "#F8F9FF",
                warningRed: "#CF3A59",
                clearGreen: "#3AA671",
            },
        },
    },
    plugins: [FormKitVariants],
};
