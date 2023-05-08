module.exports = {
  // https://dev.to/tao/adding-eslint-and-prettier-to-nuxt-3-2023-5bg
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
