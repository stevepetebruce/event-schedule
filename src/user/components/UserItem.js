import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";

import "./UserItem.css";

const UserItem = (props) => {
	return (
		<li className='user-item'>
			<Card className='user-item__content'>
				<Link to={`/${props.id}/schedules`}>
					<div className='user-item__info'>
						<h2>{props.name}</h2>
						<h3>
							{props.scheduleCount}{" "}
							{props.scheduleCount === 1 ? "schedule" : "schedules"}
						</h3>
					</div>
				</Link>
			</Card>
		</li>
	);
};

export default UserItem;
