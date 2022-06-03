export const handleGqlErrors = (error: string) => {
	if (error === "invalid_username") return "Identifiant inexistant";

	if (error === "empty_username") return "Identifiant manquant";

	if (error === "incorrect_password") return "Mot de passe invalide";

	if (error === "empty_password") return "Mot de passe manquant";

	return error;
};
