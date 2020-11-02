import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

const NavLinks = (props) => {
	const auth = useContext(AuthContext);
	return (
		<ul className='nav-links list-none m-0 p-0 flex h-full w-full flex-col justify-center items-center md:flex-row'>
			{auth.userStatus === "admin" && (
				<li className='my-3 md:my-0'>
					<NavLink
						className='px-5 py-2 rounded-full no-underline mr-2 inline-block bg-gray-900 hover:bg-gray-800 text-gray-500 focus:outline-none focus:bg-gray-900'
						to='/users'
						exact>
						All Users
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li className='my-3 md:my-0'>
					<NavLink
						className='px-5 py-2 rounded-full no-underline mr-2 inline-block bg-gray-900 hover:bg-gray-800 text-gray-500 focus:outline-none focus:bg-gray-900'
						to='/'
						exact>
						Account
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li className='my-3 md:my-0'>
					<NavLink
						className='px-5 py-2 rounded-full no-underline mr-2 inline-block bg-gray-900 hover:bg-gray-800 text-gray-500 focus:outline-none focus:bg-gray-900'
						to={`/${auth.userId}/schedules`}>
						Schedules
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li className='my-3 md:my-0'>
					<NavLink
						to='/schedule/new'
						className='px-5 py-2 rounded-full no-underline mr-2 inline-block bg-gray-900 hover:bg-gray-800 text-gray-500 focus:outline-none focus:bg-gray-900'>
						Create Schedule
					</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li className='my-6 md:my-0'>
					<NavLink
						className='px-5 py-2 rounded-full no-underline mr-2 md:ml-2 inline-block bg-transparent hover:bg-indigo-500 text-indigo-500 border border-indigo-500 hover:border-transparent hover:text-white focus:outline-none focus:bg-indigo-600'
						to='/auth'>
						Log In
					</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li className='my-6 md:my-0'>
					<button
						className='px-5 py-2 rounded-full no-underline mr-2 md:ml-2 inline-block bg-transparent hover:bg-indigo-500 text-indigo-500 border border-indigo-500 hover:border-transparent hover:text-white focus:outline-none focus:bg-indigo-600'
						inverse="true"
						onClick={auth.logout}>
						Log Out
					</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
