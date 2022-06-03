export interface User {
	databaseId?: number;
	name?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	jwtAuthToken?: string;
	jwtRefreshToken?: string;
	jwtAuthExpiration?: string;
}

export const DEFAULT_USER: User = {
	databaseId: 0,
	name: "",
	firstName: "",
	lastName: "",
	email: "",
	jwtAuthExpiration: "",
	jwtAuthToken: "",
	jwtRefreshToken: "",
};

export interface AuthData {
	loggedIn: boolean;
	user?: User;
	error?: Error;
}

export const DEFAULT_STATE: AuthData = {
	loggedIn: false,
	user: undefined,
	error: undefined,
};
export interface Refresh {
	refreshJwtAuthToken?: {
		authToken?: string;
	};
}
