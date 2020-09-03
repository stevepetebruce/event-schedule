import React from "react";

function ScheduleDisplayTimeSingle({ time }) {
	return (
		<div
			className='border-blue-400 border-r-2 border-dotted h-auto w-40'
			key={time}>
			{time}
		</div>
	);
}

export default ScheduleDisplayTimeSingle;
