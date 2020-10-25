/* eslint-disable */
import React, {useEffect, useState} from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function MonitorDisplay() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [data, setData] = useState();

	const date = new Date();
	
	useEffect(() => {
		const sendRequest = async() => {
			setIsLoading(true);
			try {
				const response = await fetch("http://localhost:5000/api/schedules/display/5f209fffe85b9293b35d2fd6/3");
				const responseData = await response.json();

				if(!response.ok) {
					throw new Error(responseData.message);
				}
				setData(responseData);
			} catch (error) {
				setError(error.message);
			}
			setIsLoading(false);

		};
		sendRequest();
	},[]);

	const errorHandler= () =>{ 
		setError(null)
	}

	return (
		<>
			<ErrorModal error={error} onClear={errorHandler}/>
			{isLoading && <LoadingSpinner asOverlay={true} />}
			{!isLoading && data && (<div className='h-screen overflow-hidden w-full'>
				<div className='px-20 pb-14 mx-auto flex justify-between content-center items-center flex-col sm:flex-row h-full'>
					<div className='flex flex-col flex-grow justify-center sm:items-start pb-12'>
						<div className='py-2 px-4 bg-red-600 text-gray-100 font-bold mb-2'>
							UP NEXT
						</div>
						<h4 className='my-2 text-4xl md:text-5xl text-indigo-600 font-bold leading-tight text-center sm:text-left'>
						{data.schedule.scheduleList[0].startTime} - {data.schedule.scheduleList[0].endTime}
						</h4>
						<h1 className='text-4xl md:text-5xl text-indigo-200 pr-2 font-bold leading-tight text-center sm:text-left'>
							{data.schedule.scheduleList[0].etitle}
						</h1>
						<p className='my-10 leading-normal md:text-2xl mb-8 text-center sm:text-left'>
							{data.schedule.scheduleList[0].stage}
						</p>
					</div>
					{data.schedule.scheduleList[0].image && <div className='flex-grow-0 w-2/5'>{data.schedule.scheduleList[0].image}</div>}
				</div>
			</div>)}
		</>
	);
}

export default MonitorDisplay;
