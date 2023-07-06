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
                xs: "614px",
                sm: "1002px",
                md: "1022px",
                lg: "1092px",
                xl: "1280px",
            },
            colors: {
                primary: "#22397d",
                secondary: "#0083f7",
                offWhite: "#f8f9fe",
                important: "#d93558",
                clearGreen: "#5cb388",
            },
        },
    },
    plugins: [FormKitVariants],
};
