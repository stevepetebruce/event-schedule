import React from "react";
import { useLocation } from "react-router-dom";

const MainHeader = (props) => {
	const location = useLocation();

	const exclusionPaths = ['/timetable', '/display'];
	const isPublic = exclusionPaths.some(el => location.pathname.includes(el))

	return (
		<>
			{!isPublic
				? <header className='w-full h-16 flex items-center fixed top-0 left-0 bg-gray-900 text-gray-600 px-4 z-10 md:justify-between'>{props.children}</header>
				: null
			}
		</>
	)
};

export default MainHeader;
