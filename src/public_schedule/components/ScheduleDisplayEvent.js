import React from "react";
import ScheduleDisplayEventItem from "./ScheduleDisplayEventItem";

function ScheduleDisplayEvent({ stages, eventList, timeDuration, eventDay }) {
	return (
		(eventList[stages[0]] && (
			<>
				{stages.map((stage) => (
					<div
						className='h-16 flex border-b border-blue-700 border-dashed w-screen relative'
						key={stage}>
						{eventList[stage].map((event) => (
							<ScheduleDisplayEventItem
								key={event.presenter}
								event={event}
								timeDuration={timeDuration}
								eventDay={eventDay}
							/>
						))}
					</div>
				))}
			</>
		)) || (
			<div className='h-16 flex items-center text-blue-200'>
				No events to display
			</div>
		)
	);
}

export default ScheduleDisplayEvent;
