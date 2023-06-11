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
        extend: {},
    },
    plugins: [FormKitVariants],
};
