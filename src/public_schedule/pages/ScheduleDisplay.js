/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ScheduleDisplayTime from "../components/ScheduleDisplayTime";
import ScheduleDisplayStages from "../components/ScheduleDisplayStages";
import ScheduleDisplayEvent from "../components/ScheduleDisplayEvent";

const ScheduleDisplay = (props) => {
	const scheduleId = useParams().scheduleId;
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedSchedule, setLoadedSchedule] = useState();
	const [timeDuration, setTimeDuration] = useState([]);
	const [stages, setStages] = useState([]);
	const [eventList, setEventList] = useState({});

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

		const stageList = (responseData) => {
			const stages = responseData.schedule.scheduleList.map((schedule) => {
				return schedule.stage;
			});
			const stagesUnique = stages.filter((a, b) => stages.indexOf(a) === b);
			setStages(stagesUnique);
		};

		const eventsByStage = (responseData) => {
			const events = responseData.schedule.scheduleList.reduce(function (r, a) {
				r[a.stage] = r[a.stage] || [];
				r[a.stage].push(a);
				return r;
			}, {});
			setEventList(events);
		};
		const fetchSchedule = async () => {
			try {
				let responseData = await sendRequest(
					`http://localhost:5000/api/schedules/${scheduleId}`
				);
				setLoadedSchedule(responseData.schedule);
				scheduleDuration(responseData);
				stageList(responseData);
				eventsByStage(responseData);
			} catch (err) {
				console.log(err.message);
			}
		};
		if (loadedSchedule) {
			return;
		}
		fetchSchedule();
	}, []);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay={true} />
				</div>
			)}
			{!isLoading && loadedSchedule && (
				<div className='w-screen flex bg-blue-900'>
					<ScheduleDisplayStages stages={stages} />
					<div className='flex flex-col overflow-x-scroll scrolling-touch'>
						<ScheduleDisplayTime timeDuration={timeDuration} />
						<ScheduleDisplayEvent stages={stages} eventList={eventList} />
					</div>
				</div>
			)}
		</>
	);
};

export default ScheduleDisplay;
