import React from "react";

function ScheduleDisplayStages({ stages }) {
	return (
		<aside className='flex-col items-center h-full text-white leading-tight truncate bg-blue-900'>
			<div className='h-6 flex items-center w-full'></div>
			<ul>
				{stages.map((stage) => (
					<li
						className='h-16 px-6 flex justify-center items-center w-full border-b border-blue-900'
						key={stage}>
						{stage}
					</li>
				))}
			</ul>
		</aside>
	);
}

export default ScheduleDisplayStages;
