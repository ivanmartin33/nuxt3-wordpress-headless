const useError = () => {
	/**
	 * Handle gql error from WPGraphql
	 * @param error
	 * @return error
	 */
	const handleGqlError = (error) => {
		// console.log(error.value.response.errors);
		if (error) {
			if (error.value.response.errors[0].message === "invalid_username")
				throw new Error("Identifiant inexistant");

			if (error.value.response.errors[0].message === "incorrect_password")
				throw new Error("Mot de passe invalide");
		}
	};

	return {
		handleGqlError,
	};
};

export default useError;
