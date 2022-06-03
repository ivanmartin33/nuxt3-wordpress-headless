import { useCookie, setCookie } from "h3";
import { Refresh } from "~~/types/auth";

export default defineEventHandler(async (e) => {
	const body: any = await useBody(e);

	/**
	 * Get the refresh token from the "X-Refresh" cookie sent by the client
	 */
	const refreshCookie = useCookie(e, "X-Refresh");

	const req = {
		query: `mutation refreshAccessToken {
			refreshJwtAuthToken(input: { jwtRefreshToken: "${refreshCookie}" }) {
				authToken
						}
				}`,
	};

	const data: Refresh = await $fetch
		.raw(process.env.GQL_HOST, {
			method: "POST",
			mode: "cors",
			body: req,
			// credentials: "include",
			headers: {
				Accept: "application/json; charset=UTF-8'",
			},
		})
		.then((response: any) => {
			return response._data.data;
		})
		.catch((e) => {
			throw new Error(e);
		});

	return data;
});
