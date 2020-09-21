import React from "react";

const ScheduleDisplayTime = ({ timeDuration }) => {
	return (
		<div className='flex'>
			<ul className='flex h-6 text-blue-200'>
				{timeDuration.map((time) => (
					<li className='w-48 border-r border-blue-600' key={time}>
						<h1 className='pl-2'>{time}</h1>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ScheduleDisplayTime;
