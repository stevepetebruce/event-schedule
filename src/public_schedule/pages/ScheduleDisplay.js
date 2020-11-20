/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ScheduleDisplayTime from "../components/ScheduleDisplayTime";
import ScheduleDisplayStages from "../components/ScheduleDisplayStages";
import ScheduleDisplayEvent from "../components/ScheduleDisplayEvent";
import MonitorHeader from "../components/MonitorHeader";

import "@reach/tabs/styles.css";
import "../../shared/components/UIElements/Tabs.css";

const ScheduleDisplay = (props) => {
	const scheduleId = useParams().scheduleId;
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedSchedule, setLoadedSchedule] = useState();
	const [timeDuration, setTimeDuration] = useState([]);
	const [stages, setStages] = useState([]);
	const [eventList, setEventList] = useState({});
	const [numDays, setNumDays] = useState([]);
	const [selectedTab, setSelectedTab] = useState(0);

	const dateDifference = (date1, date2) => {
		const oneDay = 1000 * 3600 * 24;
		const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
		const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
		const days = (utc2 - utc1) / oneDay;
		return Math.abs(days);
	}

	const checkTab = (loadedSchedule) => {
		let {daysQty, startDate} = loadedSchedule;
		if (daysQty <= 1) return;
		const todaysDate = new Date();
		todaysDate.setHours(todaysDate.getHours() - 5);
		startDate = new Date(startDate);
		const daysDifTotal = dateDifference(todaysDate, startDate);
		if (startDate > todaysDate) {
			setSelectedTab(0);
		} else if (daysDifTotal < daysQty) {
			setSelectedTab(daysDifTotal);
		} else {
			console.log("Event finished")
		}
	}

	const scheduleDuration = (responseData) => {
		const startTimes = responseData.scheduleList.map((schedule) => {
			if (parseInt(schedule.startTime.split(":")[0]) < 5) {
				return 24;
			}
			return parseInt(schedule.startTime.split(":")[0]);
		});
		const endTimes = responseData.scheduleList.map((schedule) => {
			if (parseInt(schedule.endTime.split(":")[0], 10) < 5) {
				return parseInt(schedule.endTime.split(":")[0]) + 24;
			}
			return parseInt(schedule.endTime.split(":")[0]);
		});
		const minTime = Math.min(...startTimes);
		const maxTime = Math.max(...endTimes) + 1;
		for (let i = minTime; i <= maxTime; i++) {
			i > 23
				? setTimeDuration((timeDuration) => [
						...timeDuration,
						("0" + (i - 24)).slice(-2) + ":00",
					])
				: setTimeDuration((timeDuration) => [
						...timeDuration,
						("0" + i).slice(-2) + ":00",
					]);
		}
	};

	const stageList = (responseData) => {
		const stages = responseData.scheduleList.map((schedule) => {
			return schedule.stage;
		});
		const stagesUnique = stages.filter((a, b) => stages.indexOf(a) === b);
		setStages(stagesUnique);
	};

	const eventsByStage = (responseData) => {
		const events = responseData.scheduleList.reduce(function (r, a) {
			r[a.stage] = r[a.stage] || [];
			r[a.stage].push(a);
			return r;
		}, {});
		setEventList(events);
	};

	useEffect(() => {
		const fetchSchedule = async () => {
			try {
				let responseData = await sendRequest(`http://localhost:5000/api/schedules/${scheduleId}`);
				setLoadedSchedule(responseData.schedule);
			} catch (err) {
				console.log(err.message);
			}
		};
		if (loadedSchedule) {
			return;
		}
		fetchSchedule();
	}, []);

	useEffect(() => {
		if (!loadedSchedule) return;
		checkTab(loadedSchedule);
		scheduleDuration(loadedSchedule);
		stageList(loadedSchedule);
		eventsByStage(loadedSchedule);
		setNumDays([...Array(loadedSchedule.daysQty)]);
	},[loadedSchedule]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay={true} />
				</div>
			)}
			<MonitorHeader {...loadedSchedule} />
			{!isLoading && loadedSchedule && numDays.length > 1 && (
				<div className='h-screen overflow-y-scroll w-full bg-gray-900 pt-20'>
					<Tabs defaultIndex={selectedTab}>
						<TabList>
							{numDays.map((_, i) => (
								<Tab key={i + 1}>
									<h3>Day {i + 1}</h3>
								</Tab>
							))}
						</TabList>
						<TabPanels>
							{numDays.map((_, i) => (
								<TabPanel key={i}>
									<div className='w-screen h-full flex'>
										<ScheduleDisplayStages stages={stages} />
										<div className='flex flex-col overflow-x-scroll scrolling-touch'>
											<ScheduleDisplayTime timeDuration={timeDuration} />
											<ScheduleDisplayEvent
												stages={stages}
												eventList={eventList}
												timeDuration={timeDuration}
												eventDay={i + 1}
											/>
										</div>
									</div>
								</TabPanel>
							))}
						</TabPanels>
					</Tabs>
				</div>
			)}
			{!isLoading && loadedSchedule && numDays.length <= 1 && (
				<div className='h-screen flex overflow-hidden w-full bg-gray-900 pt-20'>
					<ScheduleDisplayStages stages={stages} />
					<div className='flex flex-col overflow-x-scroll scrolling-touch'>
						<ScheduleDisplayTime timeDuration={timeDuration} />
						<ScheduleDisplayEvent
							stages={stages}
							eventList={eventList}
							timeDuration={timeDuration}
							eventDay={1}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default ScheduleDisplay;
