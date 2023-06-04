import formKitTailwind from "@formkit/themes/tailwindcss";

module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
        "./formkit.config.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [formKitTailwind],
};
