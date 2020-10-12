import React, { useEffect, useState } from "react";

function ScheduleDisplayEventItem({ event, timeDuration, eventDay }) {
	const [style, setStyle] = useState({});

	useEffect(() => {
		const calcTimes = (durTime, num) => Number(durTime.split(":")[num]);

		const scheduleStartHour = calcTimes(timeDuration[0], 0);
		let eventStartHour = calcTimes(event.startTime, 0);
		const eventStartMinutes = calcTimes(event.startTime, 1);
		const eventEndHour = calcTimes(event.endTime, 0);
		const eventEndMinutes = calcTimes(event.endTime, 1);

		let scheduleDuration;

		if (eventEndHour < eventStartHour) {
			scheduleDuration =
				(eventEndHour + 1 * 24) * 60 +
				eventEndMinutes -
				(eventStartHour * 60 + eventStartMinutes);
		} else {
			scheduleDuration =
				eventEndHour * 60 +
				eventEndMinutes -
				(eventStartHour * 60 + eventStartMinutes);
		}

		if (eventStartHour < 5) {
			eventStartHour = eventStartHour + 24;
		}

		if (timeDuration.length < 5) {
			setStyle({
				marginLeft:
					(eventStartHour - scheduleStartHour) * 300 +
					(eventStartMinutes / 60) * 300 +
					"px",
				width: (scheduleDuration / 60) * 300,
			});
		} else {
			setStyle({
				marginLeft:
					(eventStartHour - scheduleStartHour) * 200 +
					(eventStartMinutes / 60) * 200 +
					"px",
				width: (scheduleDuration / 60) * 200,
			});
		}
	}, [event, timeDuration]);

	return (
		<>
			{parseInt(event.day) === parseInt(eventDay) && (
				<div
					className='bg-orange-100 hover:bg-orange-200 focus:outline-none focus:shadow-outline w-64 h-16 flex flex-row items-center rounded shadow absolute'
					style={style}>
					{event.image && (
						<img
							src='https://images.unsplash.com/photo-1560590053-465d3d493b62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
							alt='Band'
							className='h-16 w-16 object-cover rounded-l'
						/>
					)}
					<div className='pl-3 overflow-x-auto'>
						<h3 className='font-semibold text-lg leading-tight truncate text-blue-900'>
							{event.presenter}
						</h3>
						<div className='text-gray-700 text-sm'>
							{event.startTime}-{event.endTime}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ScheduleDisplayEventItem;
