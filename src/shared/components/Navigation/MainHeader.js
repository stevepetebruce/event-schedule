import React from "react";
import { withRouter } from "react-router-dom";

import "./MainHeader.css";

const MainHeader = (props) => {
	const { location } = props;

	if (location.pathname.length === 25) {
		return null;
	}
	return <header className='main-header'>{props.children}</header>;
};

export default withRouter(MainHeader);
