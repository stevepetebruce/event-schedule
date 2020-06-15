import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ScheduleList from "../components/ScheduleList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserSchedules = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedSchedules, setloadedSchedules] = useState();
	const userId = useParams().userId;

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/schedules/user/${userId}`
				);
				setloadedSchedules(responseData.schedules);
			} catch (err) {
				console.log(err);
			}
		};
		fetchSchedules();
	}, [sendRequest, userId]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay={true} />}
			{!isLoading && loadedSchedules && (
				<ScheduleList items={loadedSchedules} />
			)}
		</>
	);
};

export default UserSchedules;
