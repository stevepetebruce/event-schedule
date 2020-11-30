import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import MonitorHeader from "../components/MonitorHeader";

const containerVariant = {
	hidden: { opacity: 0, y: 30 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			ease: "easeOut",
			duration: 0.5,
			delay:  0.5,
			staggerChildren: 0.7,
		}
	}
}

const itemVariant = {
	hidden: { opacity: 0, y: 30, },
	show: { 
		opacity: 1, 
		y: 0, 
		transition: {
			ease: "easeOut",
			duration: 0.5,
		}
	}
}

const imageVariant = {
	hidden: { opacity: 0 },
	show: { 
		opacity: 1, 
		transition: {
			ease: "easeOut",
			delay:  0.3,
			duration: 0.7
		}
	}
}

function MonitorDisplay() {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const scheduleId = useParams().scheduleId;
	const day = useParams().day;
	const [live, setLive] = useState(false)
	const [currentDisplay, setCurrentDisplay] = useState(null);
	const [eventInfo, setEventInfo] = useState(null);
	
	useEffect(() => {
		const request = async() => {
			try {
				let responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/schedules/display/${scheduleId}/${day}`);
				isEvent(responseData);
			} catch (err) {
				console.log(err.message);
			}
		};
		request();

		let interval;

		const isEvent = (data) => {
			if(data){
				const checkMorningHours = (hour) => {
					const hourNum = Number(hour)
					return hourNum < 5 ? hourNum + 24 : hourNum;
				}
				setEventInfo(data.schedule);
				const params = new URLSearchParams(document.location.search);
				const stage = params.get("stage");
				const scheduleListOrdered = data.schedule.scheduleList.sort(function(a, b){return checkMorningHours(a.startTime.split(":")[0] + "." + a.startTime.split(":")[1]) - checkMorningHours(b.startTime.split(":")[0] + "." + b.startTime.split(":")[1])});
				const filteredStage = scheduleListOrdered.filter((schedule) => { return schedule.stage === stage });
				const currentEvent = filteredStage.find((event) => {
					const currentTime = Date.now();
					const now = new Date();
					const startTime = now.setHours(checkMorningHours(event.startTime.split(":")[0]), event.startTime.split(":")[1] ,0);
					const endTime = now.setHours(checkMorningHours(event.endTime.split(":")[0]), event.endTime.split(":")[1] ,0);

					interval = setInterval(() => {
						setLive(false);
						isEvent(data);
					}, 60000);

					if(currentTime > startTime && currentTime < endTime) {
						setLive(true)
						return event;
					}
					else if(currentTime < startTime)	{
						setLive(false);
						return event;
					}
					return null;
				})
				setCurrentDisplay(currentEvent);
			}
		}
		return () => clearInterval(interval);
		//eslint-disable-next-line
	},[]);
	

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay={true} />
				</div>
			)}
			<MonitorHeader {...eventInfo} />
			{!isLoading && currentDisplay && (
				<div className='h-screen overflow-hidden w-full bg-gray-900'>
					<div className='px-20 pb-14 mx-auto flex justify-between content-center items-center flex-col sm:flex-row h-full'>
						<motion.div className='flex flex-col flex-grow justify-center sm:items-start pb-12' 
							variants={containerVariant}
							initial="hidden"
							animate="show">
							<div className='py-2 px-4 bg-red-600 text-gray-100 font-bold mb-2'>
								{live ? "ON NOW" : "UP NEXT"}
							</div>
							<motion.h4 className='my-2 text-4xl md:text-5xl text-indigo-600 font-bold leading-tight text-center sm:text-left' variants={itemVariant}>
							{currentDisplay.startTime} - {currentDisplay.endTime}
							</motion.h4>
							<motion.h1 className='text-4xl md:text-5xl text-indigo-200 pr-2 font-bold leading-tight text-center sm:text-left' variants={itemVariant}>
								{currentDisplay.presenter}
							</motion.h1>
							<motion.p className='my-10 leading-normal md:text-2xl mb-8 text-center sm:text-left' variants={itemVariant}>
								{currentDisplay.stage}
							</motion.p>
						</motion.div>
						<div className='flex-grow-0 w-2/5'>
							{currentDisplay.image ?
								<motion.img src={currentDisplay.image} alt={currentDisplay.presenter} variants={imageVariant} initial="hidden" animate="show" />
							: eventInfo.logo ?
								<motion.img src={eventInfo.logo} alt={eventInfo.title} variants={imageVariant} initial="hidden" animate="show"  />
							: null}
						</div>
					</div>
				</div>
			)}
			{!isLoading && !currentDisplay && (
				<div className='center w-11/12 max-w-2xl my-4 mx-auto mt-20'>
					<Card>
						<h2>No event to display</h2>
					</Card>
				</div>
			)}
		</>
	);
}

export default MonitorDisplay;
