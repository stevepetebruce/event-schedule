import React, { useEffect, useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";

import ScheduleDisplayModalDetails from "./ScheduleDisplayModalDetails";
import ScheduleDisplayModalFooter from "./ScheduleDisplayModalFooter";

function ScheduleDisplayEventItem({ event, timeDuration, eventDay }) {
	const [style, setStyle] = useState({});
	const [showDetailsModal, setShowDetailsModal] = useState(false);

	const showDetailsHandler = () => {
		if (!event.biography) return;
		setShowDetailsModal(true);
	};

	const cancelDetailsHandler = () => {
		setShowDetailsModal(false);
	};

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
			<Modal
				show={showDetailsModal}
				cancel={showDetailsModal}
				modal='modal-wide bg-gray-900'
				header={
					<div className='flex justify-end'>
						<button onClick={cancelDetailsHandler} className='text-xl'>&#10005;</button>
					</div>
				}
				footer={<ScheduleDisplayModalFooter event={event} />}>
				<ScheduleDisplayModalDetails event={event} />
			</Modal>
			{parseInt(event.day) === parseInt(eventDay) && (
				<div
					className='bg-orange-100 hover:bg-orange-200 focus:outline-none focus:shadow-outline w-64 h-16 flex flex-row items-center rounded shadow absolute'
					style={style}
					onClick={showDetailsHandler}>
					{event.imagethmb && (
						<img
							src={event.imagethmb}
							alt={event.presenter}
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
