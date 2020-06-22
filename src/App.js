import React, { useState, useCallback } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import Account from "./user/pages/Account";
import NewSchedule from "./schedules/pages/NewSchedule";
import UserSchedules from "./schedules/pages/UserSchedules";
import UpdateSchedule from "./schedules/pages/UpdateSchedule";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Authenticate from "./user/pages/Authenticate";

import { AuthContext } from "./shared/context/auth-context";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);
	const [userStatus, setUserStatus] = useState(null);

	const login = useCallback((uid, ustatus) => {
		setIsLoggedIn(true);
		setUserId(uid);
		setUserStatus(ustatus);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setUserId(null);
		setUserStatus(null);
	}, []);

	let routes;

	if (isLoggedIn) {
		routes = (
			<>
				{userStatus === "admin" && (
					<Route path='/users' exact>
						<Users />
					</Route>
				)}
				<Route path='/' exact>
					<Account />
				</Route>
				<Route path='/:userId/schedules' exact>
					<UserSchedules />
				</Route>
				<Route path='/schedule/new' exact>
					<NewSchedule />
				</Route>
				<Route path='/schedules/:scheduleId'>
					<UpdateSchedule />
				</Route>
				<Redirect to='/' />
			</>
		);
	} else {
		routes = (
			<>
				<Route path='/auth' exact>
					<Authenticate />
				</Route>
				<Redirect to='/auth' />
			</>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				userId: userId,
				userStatus: userStatus,
				login: login,
				logout: logout,
			}}>
			<Router>
				<MainNavigation />
				<main className='w-full max-w-screen-md mx-auto flex'>
					<Switch>{routes}</Switch>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
