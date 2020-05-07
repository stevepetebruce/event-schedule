import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../shared/context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
	const auth = useContext(AuthContext);
	return (
		<ul className='nav-links'>
			<li>
				<NavLink to='/' exact>
					All Users
				</NavLink>
			</li>
			{auth.isLoggedIn && (
				<li>
					<NavLink to='/u1/schedules'>Schedules</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<NavLink to='/schedule/new'>Create Schedule</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to='/schedule/new/list'>Create Schedule List</NavLink>
				</li>
			)}
			{!auth.isLoggedIn && (
				<li>
					<NavLink to='/auth'>Log In</NavLink>
				</li>
			)}
			{auth.isLoggedIn && (
				<li>
					<button onClick={auth.logout}>Log Out</button>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
