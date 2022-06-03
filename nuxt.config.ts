import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
	css: ["@/assets/css/tailwind.css"],
	modules: ["nuxt-graphql-client"],
	autoImports: { global: true },
	runtimeConfig: {
		public: {
			GQL_HOST: process.env.GQL_HOST,
			onlyOperationTypes: true,

			"graphql-client": {
				clients: {
					default: process.env.GQL_HOST,
				},
			},
		},
	},

	build: {
		postcss: {
			postcssOptions: {
				plugins: {
					tailwindcss: {},
					autoprefixer: {},
				},
			},
		},
	},
});
