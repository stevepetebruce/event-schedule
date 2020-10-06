import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ScheduleItem from "./ScheduleItem";

import "./ScheduleList.css";

const ScheduleList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className='place-list center'>
				<Card>
					<h2 className='mb-6'>Create your first schedule</h2>
					<div className='inline pl-4 center'>
						<Button default to='/schedule/new' className='center'>
							Create Schedule
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<ul className='place-list'>
			{props.items.map((schedule) => (
				<ScheduleItem
					key={schedule.id}
					id={schedule.id}
					image={schedule.image}
					title={schedule.title}
					description={schedule.description}
					address={schedule.address}
					coordinates={schedule.location}
					date={schedule.date}
					creatorId={schedule.creator}
					onDelete={props.onDeleteSchedule}
				/>
			))}
		</ul>
	);
};

export default ScheduleList;
