import React from "react";

const ScheduleDisplayTime = ({ timeDuration }) => {
	return (
		<div class='flex'>
			<ul class='flex h-6 text-blue-200'>
				{timeDuration.map((time) => (
					<li class='w-48 border-r border-blue-600' key={time}>
						<h1 class='pl-2'>{time}</h1>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ScheduleDisplayTime;
