import React, { useEffect, useState } from "react";

const ScheduleDisplayTime = ({ timeDuration }) => {
	const [style, setStyle] = useState({});
	// console.log(timeDuration);

	useEffect(() => {
		if (timeDuration.length < 5) {
			setStyle({
				width: 300 + "px",
			});
		} else {
			setStyle({
				width: 200 + "px",
			});
		}
	}, [timeDuration]);

	return (
		<div className='flex'>
			<ul className='flex h-6 text-blue-200'>
				{timeDuration.map((time) => (
					<li className='border-r border-blue-600' key={time} style={style}>
						<h1 className='pl-2'>{time}</h1>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ScheduleDisplayTime;
