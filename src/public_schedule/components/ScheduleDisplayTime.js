import React, { useEffect, useState } from "react";

const ScheduleDisplayTime = ({ timeDuration }) => {
	const [style, setStyle] = useState({});

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
			<ul className='flex h-6 text-indigo-200 mt-2'>
				{timeDuration.map((time) => (
					<li className='border-r border-indigo-600' key={time} style={style}>
						<h3 className='pl-2'>{time}</h3>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ScheduleDisplayTime;
