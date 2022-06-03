import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
	css: ["@/assets/css/tailwind.css"],
	modules: ["nuxt-graphql-client"],

	runtimeConfig: {
		public: {
			GQL_HOST: process.env.GQL_HOST,
		},
	},

	gql: {
		onlyOperationTypes: true,
		silent: true,
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
