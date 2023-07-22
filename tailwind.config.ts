import type { Config } from "tailwindcss";

// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
// Allowing ddark modde https://tailwindcss.nuxtjs.org/examples/dark-mode
export default <Partial<Config>>{
    darkMode: "class",
    theme: {
        extend: {
            screens: {
                sm: "480px",
                md: "768px",
                lg: "976px",
                xl: "1440px",
            },
            colors: {
                primary: { 100: "#23397D", 200: "#1B2B65" },
                secondary: { 100: "#017EFA" },
                offWhite: { DEFAULT: "#F8F9FF" },
                warningRed: { DEFAULT: "#CF3A59" },
                clearGreen: { DEFAULT: "#3AA671" },
            },
        },
    },
    plugins: [],
    content: [],
};
