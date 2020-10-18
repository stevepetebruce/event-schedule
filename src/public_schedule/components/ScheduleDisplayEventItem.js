import React, { useEffect, useState } from "react";
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Icon } from "@material-ui/core";
import SoundCloudIcon from "../../assets/icons/soundcloud-tile.svg";

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
				modal='modal-wide'
				header={
					<div className='flex justify-between'>
						{event.presenter}
						<button onClick={cancelDetailsHandler}>&#10005;</button>
					</div>
				}
				footer={
					<>
						<Button default onClick={cancelDetailsHandler}>
							CLOSE
						</Button>
					</>
				}>
				<div className='flex flex-col'>
					<div className='py-2 pr-2 m-2 overflow-y-scroll scrolling-touch'>
						{event.image && (
							<img
								className='float-right ml-4 my-2 w-full sm:w-3/12'
								src={event.image}
								alt={event.presenter}
							/>
						)}
						<p>{event.biography}</p>
					</div>

					<div className='py-2 m-2 flex flex-row'>
						{event.socialList.facebook && (
							<a
								href={event.socialList.facebook}
								target='_blank'
								rel='noopener noreferrer'
								className='mx-2'>
								<FacebookIcon htmlColor='#3b5998' fontSize='large' />
							</a>
						)}
						{event.socialList.twitter && (
							<a
								href={event.socialList.twitter}
								target='_blank'
								rel='noopener noreferrer'
								className='mx-2'>
								<TwitterIcon htmlColor='#4099ff' fontSize='large' />
							</a>
						)}
						{event.socialList.youtube && (
							<a
								href={event.socialList.youtube}
								target='_blank'
								rel='noopener noreferrer'
								className='mx-2'>
								<YouTubeIcon htmlColor='#c4302b' fontSize='large' />
							</a>
						)}
						{event.socialList.soundcloud && (
							<a
								href={event.socialList.soundcloud}
								target='_blank'
								rel='noopener noreferrer'
								className='ml-3 mt-2'>
								<Icon>
									<img
										src={SoundCloudIcon}
										height={22}
										width={26}
										alt='SoundCloud'
									/>
								</Icon>
							</a>
						)}
					</div>
				</div>
			</Modal>
			{parseInt(event.day) === parseInt(eventDay) && (
				<div
					className='bg-orange-100 hover:bg-orange-200 focus:outline-none focus:shadow-outline w-64 h-16 flex flex-row items-center rounded shadow absolute'
					style={style}
					onClick={showDetailsHandler}>
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
