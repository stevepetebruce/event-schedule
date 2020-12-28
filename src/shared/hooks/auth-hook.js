import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(null);
	const [userName, setUserName] = useState(null);
	const [userStatus, setUserStatus] = useState(null);

	const login = useCallback((uid, uname, tkn, status, expirationDate) => {
		setToken(tkn);
		setUserId(uid);
		setUserName(uname);
		setUserStatus(status);
		const currentTokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(currentTokenExpirationDate);
		localStorage.setItem(
			"userData",
			JSON.stringify({
				userId: uid,
				userName: uname,
				token: tkn,
				expiration: currentTokenExpirationDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setUserId(null);
		setUserName(null);
		setUserStatus(null);
		setToken(null);
		setTokenExpirationDate(null);
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.userName,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [login]);

	return { token, login, logout, userId, userName, userStatus };
};
