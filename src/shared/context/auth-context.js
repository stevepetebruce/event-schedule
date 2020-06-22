import { createContext } from "react";

export const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	userStatus: null,
	login: () => {},
	logout: () => {},
});
