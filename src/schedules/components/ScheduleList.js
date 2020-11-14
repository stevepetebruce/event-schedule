import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ScheduleItem from "./ScheduleItem";

const ScheduleList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className='center w-11/12 max-w-2xl my-4 mx-auto mt-20'>
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
		<ul className='w-11/12 max-w-2xl list-none my-4 mx-auto mt-20'>
			{props.items.map((schedule) => (
				<ScheduleItem
					key={schedule.id}
					id={schedule.id}
					logo={schedule.logo}
					title={schedule.title}
					description={schedule.description}
					address={schedule.address}
					coordinates={schedule.location}
					date={schedule.date}
					creatorId={schedule.creator}
					onDelete={props.onDeleteSchedule}
					numDays={schedule.daysQty}
					events = {schedule.scheduleList}
				/>
			))}
		</ul>
	);
};

export default ScheduleList;
