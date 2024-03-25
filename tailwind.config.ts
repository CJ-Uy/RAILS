import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
// Default are on https://tailwindcss.nuxtjs.org/tailwind/config#default-configuration
// Allowing dark mode https://tailwindcss.nuxtjs.org/examples/dark-mode
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
                // https://javisperez.github.io/tailwindcolorshades/?bay-of-many=23397D&accent=027ffd
                // Naming it "primary" causes a contradiction with the default "primary" color
                main: {
                    DEFAULT: "#23397D",
                    50: "#EDF3F7",
                    100: "#E1EBF2",
                    200: "#B6CBDE",
                    300: "#91ACCC",
                    400: "#5270A3",
                    500: "#23397D",
                    600: "#1C3070",
                    700: "#14245E",
                    800: "#0D194A",
                    900: "#071038",
                    950: "#030824",
                },
                accent: {
                    DEFAULT: "#027ffd",
                    50: "#f2fcff",
                    100: "#e6f8ff",
                    200: "#bfebff",
                    300: "#99dbff",
                    400: "#4eb1fc",
                    500: "#027ffd",
                    600: "#026fe3",
                    700: "#0253bd",
                    800: "#023d96",
                    900: "#002a73",
                    950: "#00174a",
                },
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
    content: ["./app.vue"],
};
