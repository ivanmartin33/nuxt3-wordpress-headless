import { User, AuthData } from "@/types/auth";
import jwt_decode from "jwt-decode";

const useAuth = () => {
	const authUser = useUser();
	const router = useRouter();
	const config = useRuntimeConfig();

	// Short duration JWT token (5 min)
	const getJwtToken = () => {
		if (process.client) return sessionStorage.getItem("jwt");
	};

	const setJwtToken = (token) => {
		if (process.client) sessionStorage.setItem("jwt", token);
	};

	// Longer duration refresh token (60 min)
	const getRefreshToken = () => {
		if (process.client) {
			const refresh = sessionStorage.getItem("refreshToken");
			return refresh;
		}
	};

	const setRefreshToken = (token) => {
		if (process.client) sessionStorage.setItem("refreshToken", token);
	};

	const unsetJwtToken = () => {
		if (process.client) sessionStorage.clear();
	};

	/**
	 * Sign in method
	 * @param user The user login
	 * @param password The password
	 * @param metadata Like email, address, city etc...
	 */
	const signUp = async ({ user, password, ...metadata }) => {
		// const { user: u, error } = await supabase.auth.signUp(
		// 	{
		// 		email,
		// 		password,
		// 	},
		// 	{
		// 		data: metadata,
		// 		redirectTo: `${window.location.origin}/profil?source=email`,
		// 	}
		// );
		// if (error) throw error;
		// return u;
	};

	/**
	 * Sign in method
	 * @param user The user login
	 * @param password The password
	 */
	const signIn = async ({ user, password }) => {
		const { data, error } = await useAsyncData(
			"user",
			async () =>
				await $fetch<User>("/api/login", {
					method: "POST",
					body: {
						user,
						password,
					},
				}).catch((err) => {
					throw err;
				}),
			{
				initialCache: false,
			}
		);

		/**
		 * catch error if present
		 */
		if (!error.value) {
			setJwtToken(data.value.jwtAuthToken);
			authUser.value = data.value;
		} else {
			throw error.value;
		}
	};

	/**
	 *  Sign out method: clear session storage
	 */
	const signOut = () => {
		unsetJwtToken();
		authUser.value = null;
		router.push("/");
	};

	/**
	 * Check if jwt token is valid else refresh token by request to /api/refresh endpoint
	 * @param jwtToken
	 * @param jwtRefreshToken
	 */
	const refreshTokenExpired = async () => {
		if (getJwtToken()) {
			const token: any = jwt_decode(getJwtToken());

			if (Date.now() >= token.exp * 1000) {
				const { data } = await useAsyncData(
					"refresh",
					async () =>
						await $fetch("/api/refresh", {
							method: "POST",
						}),
					{
						initialCache: false, // reset the initial cache for useAsyncData
					}
				).catch((error) => {
					throw error.data;
				});
				setJwtToken(data.value.refreshJwtAuthToken.authToken);
			}
		}
	};

	/**
	 * Handle the sign in process
	 * @param {user, password}
	 */
	const handleSignIn = async ({ user, password }) => {
		// Call login method in API
		// The server handler is responsible for setting user fingerprint cookie during this as well
		await signIn({ user, password });
		// // If you like, you may redirect the user now
		// Router.push("/");
	};

	return {
		signUp,
		signIn,
		signOut,
		getJwtToken,
		getRefreshToken,
		setRefreshToken,
		setJwtToken,
		refreshTokenExpired,
		handleSignIn,
	};
};

export default useAuth;
