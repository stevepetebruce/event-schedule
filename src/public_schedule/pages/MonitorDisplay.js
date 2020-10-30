import React, {useEffect, useState} from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";

function MonitorDisplay() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [live, setLive] = useState(false)
	const [currentDisplay, setCurrentDisplay] = useState(null);
	
	useEffect(() => {
		const sendRequest = async() => {
			setIsLoading(true);
			try {
				const response = await fetch("http://localhost:5000/api/schedules/display/5f96ba6012e3152e34685882/1");
				const responseData = await response.json();
				
				if(!response.ok) {
					throw new Error(responseData.message);
				}
				isEvent(responseData);
			} catch (error) {
				setError(error.message);
			}
			setIsLoading(false);
		};
		sendRequest();

		let interval

		const isEvent = (data) => {
			if(data){
				const checkMorningHours = (hour) => {
					const hourNum = Number(hour)
					return hourNum < 5 ? hourNum + 24 : hourNum;
				}
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
	
	
	const errorHandler= () =>{ 
		setError(null)
	}


	return (
		<>
			<ErrorModal error={error} onClear={errorHandler}/>
			{isLoading && <LoadingSpinner asOverlay={true} />}
			{!isLoading && currentDisplay && (<div className='h-screen overflow-hidden w-full'>
				<div className='px-20 pb-14 mx-auto flex justify-between content-center items-center flex-col sm:flex-row h-full'>
					<div className='flex flex-col flex-grow justify-center sm:items-start pb-12'>
						<div className='py-2 px-4 bg-red-600 text-gray-100 font-bold mb-2'>
							{live ? "ON NOW" : "UP NEXT"}
						</div>
						<h4 className='my-2 text-4xl md:text-5xl text-indigo-600 font-bold leading-tight text-center sm:text-left'>
						{currentDisplay.startTime} - {currentDisplay.endTime}
						</h4>
						<h1 className='text-4xl md:text-5xl text-indigo-200 pr-2 font-bold leading-tight text-center sm:text-left'>
							{currentDisplay.presenter}
						</h1>
						<p className='my-10 leading-normal md:text-2xl mb-8 text-center sm:text-left'>
							{currentDisplay.stage}
						</p>
					</div>
					<div className='flex-grow-0 w-2/5'>image</div>
				</div>
			</div>)}
			{!isLoading && !currentDisplay && (
				<div className='center w-11/12 max-w-2xl my-4 mx-auto'>
				<Card>
					<h2>Event has finished</h2>
				</Card>
			</div>)}
		</>
	);
}

export default MonitorDisplay;
