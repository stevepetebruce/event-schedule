import React, { useEffect, useState } from "react";
import ScheduleDisplayEventItem from "./ScheduleDisplayEventItem";

function ScheduleDisplayEvent({ stages, eventList, timeDuration, eventDay }) {
	const [style, setStyle] = useState({});

	useEffect(() => {
		if (timeDuration.length < 5) {
			setStyle({
				width: 300 * timeDuration.length + "px",
			});
		} else {
			setStyle({
				width: 200 * timeDuration.length + "px",
			});
		}
	}, [timeDuration]);

	return (
		(eventList[stages[0]] && (
			<>
				{stages.map((stage) => (
					<div
						className='h-16 flex border-b border-indigo-700 border-dashed w-screen relative'
						key={stage}
						style={style}>
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
			<div className='h-16 flex items-center text-indigo-200'>
				No events to display
			</div>
		)
	);
}

export default ScheduleDisplayEvent;
