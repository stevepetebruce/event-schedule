import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ScheduleDisplayTime from "../components/ScheduleDisplayTime";

const ScheduleDisplay = (props) => {
	const scheduleId = useParams().scheduleId;
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedSchedule, setLoadedSchedule] = useState();
	const [timeDuration, setTimeDuration] = useState([]);

	useEffect(() => {
		const scheduleDuration = (responseData) => {
			const startTimes = responseData.schedule.scheduleList.map((schedule) => {
				return parseInt(schedule.startTime.substring(0, 2));
			});
			const endTimes = responseData.schedule.scheduleList.map((schedule) => {
				return parseInt(schedule.endTime.substring(0, 2));
			});
			const minTime = Math.min(...startTimes);
			const maxTime = Math.max(...endTimes) + 1;

			for (let i = minTime; i <= maxTime; i++) {
				if (maxTime > 24) {
					i = `0${maxTime - 24}`;
				}
				setTimeDuration((timeDuration) => [...timeDuration, i + ":00"]);
			}
		};

		const fetchSchedule = async () => {
			try {
				let responseData = await sendRequest(
					`http://localhost:5000/api/schedules/${scheduleId}`
				);
				setLoadedSchedule(responseData.schedule);
				scheduleDuration(responseData);
			} catch (err) {
				console.log(err.message);
			}
		};
		if (loadedSchedule) {
			return;
		}
		fetchSchedule();
	}, [loadedSchedule, scheduleId, sendRequest, timeDuration]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay={true} />
				</div>
			)}
			{!isLoading && loadedSchedule && (
				<ScheduleDisplayTime timeDuration={timeDuration} />
			)}
		</>
	);
};

export default ScheduleDisplay;
