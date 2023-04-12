module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true
	},
	extends: [
		"plugin:vue/vue3-essential",
		"airbnb-base",
		"airbnb-typescript/base"
	],
	overrides: [],
	parser: "vue-eslint-parser",
	extends: ["@nuxtjs/eslint-config-typescript", "eslint-recommended", "plugin:prettier/recommended"],
	parserOptions: {
		extraFileExtensions: [".vue"],
		ecmaVersion: "latest",
		parser: "@typescript-eslint/parser",
		project: "./tsconfig.json"
	},
	plugins: ["vue", "import", "prettier"],
	settings: {
		"import/resolver": {
			alias: {
				extensions: [".js", ".jsx", ".ts", ".tsx"]
			}
		}
    },
	rules: {
		"import/no-unresolved": "error",
		"@typescript-eslint/no-var-requires": "off",
		"no-console": "off"
	}
}
