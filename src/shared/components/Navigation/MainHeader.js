import React from "react";
import { withRouter } from "react-router-dom";

const MainHeader = (props) => {
	const { location } = props;

	if (location.pathname.length === 25) {
		return null;
	}
	return (
		<header className='w-full h-16 flex items-center fixed top-0 left-0 bg-gray-900 text-gray-600 px-4 z-10 md:justify-between'>
			{props.children}
		</header>
	);
};

export default withRouter(MainHeader);
