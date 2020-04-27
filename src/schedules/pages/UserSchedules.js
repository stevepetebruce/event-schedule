import React from "react";
import { useParams } from "react-router-dom";

import ScheduleList from "../components/ScheduleList";

const DUMMY_SCHEDULES = [
	{
		id: "s1",
		title: "New Show",
		description: "A great show",
		imageUrl:
			"http://www.tutorialsscripts.com/free-icons/alphabet-characters/lower-case-letter/a-icon/white-little-letter-character-a-icon-48-x-48.png",
		address: "address bfsdbfm  fd fmds ",
		location: {
			lat: 50.8047148,
			lng: -1.1667698,
		},
		date: "23423423",
		creator: "u1",
	},
	{
		id: "s2",
		title: "Second Show",
		description: "Another great show",
		imageUrl:
			"http://www.tutorialsscripts.com/free-icons/alphabet-characters/lower-case-letter/a-icon/white-little-letter-character-a-icon-48-x-48.png",
		address: "address dbfm  fd fmds ",
		location: {
			lat: 49.8047148,
			lng: -1.1667698,
		},
		date: "23423423",
		creator: "u2",
	},
];

const UserSchedules = (props) => {
	const userId = useParams().userId;
	const loadedSchedules = DUMMY_SCHEDULES.filter(
		(schedule) => schedule.creator === userId
	);
	return <ScheduleList items={loadedSchedules} />;
};

export default UserSchedules;
