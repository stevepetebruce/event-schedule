import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import ScheduleList from "../components/ScheduleList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserSchedules = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedSchedules, setloadedSchedules] = useState();
	const userId = useParams().userId;
	const auth = useContext(AuthContext);

	const scheduleDeletedHandler = (deletedScheduleId) => {
		setloadedSchedules((prevSchedules) =>
			prevSchedules.filter((schedule) => schedule.id !== deletedScheduleId)
		);
	};

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/schedules/user/${userId}`,
					"GET",
					null,
					{
						Authorization: "Bearer " + auth.token,
					}
				);
				setloadedSchedules(responseData.schedules);
			} catch (err) {
				console.log(err);
			}
		};
		fetchSchedules();
	}, [auth.token, sendRequest, userId]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay={true} />}
			{!isLoading && loadedSchedules && (
				<ScheduleList
					items={loadedSchedules}
					onDeleteSchedule={scheduleDeletedHandler}
				/>
			)}
		</>
	);
};

export default UserSchedules;
