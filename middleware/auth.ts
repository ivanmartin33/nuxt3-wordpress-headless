export default defineNuxtRouteMiddleware(() => {
	const user = useUser();
	const { signOut, refreshTokenExpired } = useAuth();

	if (!user.value) {
		signOut();
	} else {
		refreshTokenExpired();
	}
});
