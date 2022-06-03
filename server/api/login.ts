/**
 * The login endpoint for graphql login requests.
 */
import { setCookie } from "h3";

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

	return await $fetch
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
			 * return the data
			 */
			return response._data.data;
		})
		.catch((e) => console.log(e));
});
