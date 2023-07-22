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
                light: {
                    text: "#050505",
                    background: "#fafafa",
                    primary: "#23397D",
                    secondary: "#eeeeee",
                    accent: "#027ffd",
                },
                dark: {
                    text: "#fafafa",
                    background: "#050505",
                    primary: "#23397D",
                    secondary: "#1a1a1a",
                    accent: "#67b2fe",
                },
            },
        },
    },
    plugins: [],
    content: [],
};
