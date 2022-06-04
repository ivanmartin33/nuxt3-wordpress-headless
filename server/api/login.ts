/**
 * The login endpoint for graphql login requests.
 */
import { setCookie, createError, H3Error } from "h3";
import { User } from "~~/types/auth";
import { handleGqlErrors } from "~~/server/utils/wpGraphqlErrors";

export default defineEventHandler(async (e) => {
	const body: any = await useBody(e);

	/**
	 * GraphQL login request with credentials
	 */
	const req = {
		query: `
		mutation LoginUser {
			login(input: { username: "${body.user}", password: "${body.password}" }) {
				user {
					databaseId
					name
					email
					firstName
					lastName
					jwtAuthToken
					jwtRefreshToken
					jwtAuthExpiration
				}
			}
		}`,
	};

	const data = await $fetch
		.raw(process.env.GQL_HOST, {
			method: "POST",
			mode: "cors",
			body: req,
			headers: {
				Accept: "application/json; charset=UTF-8'",
			},
		})
		.then((response: any) => {
			/**
			 * Check errors from wp-graphql
			 */
			if (response._data.errors) {
				const errorMessage = handleGqlErrors(response._data.errors[0].message);

				const error: H3Error = {
					message: errorMessage,
					statusCode: 400,
					statusMessage: errorMessage,
					name: "Error Graphql",
				};

				throw createError(error);
			} else {
				/**
				 * Parse the cookie from the response headers
				 */
				const cookieName = "X-Refresh";
				const cookie = Object.fromEntries(
					response.headers
						.get("set-cookie")
						?.split(";")
						.map((a) => a.trim().split("="))
				);

				/**
				 * Set a refresh cookie
				 */
				setCookie(e, cookieName, cookie["X-Refresh"], {
					maxAge: cookie["Max-Age"],
					domain: cookie.domain,
					httpOnly: cookie.httponly === undefined ? true : false,
					secure: cookie.secure === undefined ? true : false,
				});

				/**
				 * return the user data
				 */
				return response._data.data.login.user as User;
			}
		})
		.catch((e) => {
			if (e.statusCode === 400) {
				throw e;
			} else {
				const error: H3Error = {
					message: "Server Error",
					statusCode: 500,
					statusMessage: "Server Error",
					name: "Error Graphql",
				};
				throw createError(error);
			}
		});

	return data;
});
