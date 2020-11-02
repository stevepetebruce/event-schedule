import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import Account from "./user/pages/Account";
import ScheduleDisplay from "./public_schedule/pages/ScheduleDisplay";
import MonitorDisplay from "./public_schedule/pages/MonitorDisplay";
import NewSchedule from "./schedules/pages/NewSchedule";
import UserSchedules from "./schedules/pages/UserSchedules";
import UpdateSchedule from "./schedules/pages/UpdateSchedule";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Authenticate from "./user/pages/Authenticate";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
	const { token, login, logout, userId, userStatus } = useAuth();

	let routes;

	if (token) {
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
				<Route path='/:scheduleId' exact>
					<ScheduleDisplay />
				</Route>
				<Route path='/display/:scheduleId/:day'>
					<MonitorDisplay />
				</Route>
				<Redirect to='/' />
			</>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/auth' exact>
					<Authenticate />
				</Route>
				<Route path='/:scheduleId' exact>
					<ScheduleDisplay />
				</Route>
				<Route path='/display/:scheduleId/:day'>
					<MonitorDisplay />
				</Route>
				<Redirect to='/auth' />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				userStatus: userStatus,
				login: login,
				logout: logout,
			}}>
			<Router>
				<MainNavigation />
				<main className='w-full mx-auto flex mt-20 subpixel-antialiased'>
					<Switch>{routes}</Switch>
				</main>
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
