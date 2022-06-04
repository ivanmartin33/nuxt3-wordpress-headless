import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
	css: ["@/assets/css/style.css"],
	// plugins: ["@/plugins/vue-dom-purify"],
	modules: ["nuxt-graphql-client", "@nuxtjs/tailwindcss"],
	buildModules: [],
	runtimeConfig: {
		public: {
			GQL_HOST: process.env.GQL_HOST,
		},
	},

	gql: {
		onlyOperationTypes: true,
		silent: true,
	},
	tailwindcss: {
		jit: true,
		exposeConfig: true,
		viewer: false,
	},
});
