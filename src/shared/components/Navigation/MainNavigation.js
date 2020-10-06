import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

const MainNavigation = (props) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawerHandler = () => {
		setDrawerIsOpen(true);
	};

	const closeDrawerHandler = () => {
		setDrawerIsOpen(false);
	};

	return (
		<React.Fragment>
			{drawerIsOpen ? <Backdrop onClick={closeDrawerHandler} /> : null}
			<SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
				<nav className='h-full bg-gray-900 text-gray-600 left-0 top-0 fixed z-50 w-8/12 h-screen shadow-2xl'>
					<NavLinks />
				</nav>
			</SideDrawer>
			<MainHeader>
				<button
					className='main-navigation__menu-btn mr-12 pointer-events-auto text-xl'
					onClick={openDrawerHandler}>
					&#9776;
				</button>
				<h3 className='main-navigation__title'>
					<Link to='/'>Your Schedules</Link>
				</h3>
				<nav className='main-navigation__header-nav'>
					<NavLinks />
				</nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
