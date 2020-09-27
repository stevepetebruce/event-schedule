import React, { useEffect, useState } from "react";

function ScheduleDisplayEventItem({ event, timeDuration }) {
	const [style, setStyle] = useState({});

	useEffect(() => {
		const calcTimes = (durTime, num) => Number(durTime.split(":")[num]);

		const startTime = calcTimes(timeDuration[0], 0);
		const eventStarthour = calcTimes(event.startTime, 0);
		const eventStartMinutes = calcTimes(event.startTime, 1);
		const eventEndhour = calcTimes(event.endTime, 0);
		const eventEndMinutes = calcTimes(event.endTime, 1);

		const scheduleDuration =
			eventEndhour * 60 +
			eventEndMinutes -
			(eventStarthour * 60 + eventStartMinutes);

		if (timeDuration.length < 5) {
			setStyle({
				marginLeft:
					(eventStarthour - startTime) * 300 +
					(eventStartMinutes / 60) * 300 +
					"px",
				width: (scheduleDuration / 60) * 300,
			});
		} else {
			setStyle({
				marginLeft:
					(eventStarthour - startTime) * 200 +
					(eventStartMinutes / 60) * 200 +
					"px",
				width: (scheduleDuration / 60) * 200,
			});
		}
	}, [event, timeDuration]);

	return (
		<div
			className='bg-orange-100 hover:bg-orange-200 focus:outline-none focus:shadow-outline w-64 flex flex-row items-center rounded shadow absolute'
			style={style}>
			<img
				src='https://images.unsplash.com/photo-1560590053-465d3d493b62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
				alt='Band'
				className='h-16 w-16 object-cover rounded-l'
			/>
			<div className='pl-3 overflow-x-auto'>
				<h3 className='font-semibold text-lg leading-tight truncate text-blue-900'>
					{event.presenter}
				</h3>
				<div className='text-gray-700 text-sm'>
					{event.startTime}-{event.endTime}
				</div>
			</div>
		</div>
	);
}

export default ScheduleDisplayEventItem;
