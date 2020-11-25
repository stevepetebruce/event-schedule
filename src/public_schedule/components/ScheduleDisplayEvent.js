import React, { Fragment, useEffect, useState } from "react";
import ScheduleDisplayEventItem from "./ScheduleDisplayEventItem";
import { motion } from "framer-motion"

function ScheduleDisplayEvent({ stages, eventList, timeDuration, eventDay, tabAnimate }) {
	const [style, setStyle] = useState({});

	useEffect(() => {
		if (timeDuration.length < 5) {
			setStyle({
				width: 300 * timeDuration.length + "px",
			});
		} else {
			setStyle({
				width: 200 * timeDuration.length + "px",
			});
		}
	}, [timeDuration]);

	return (
		(eventList[stages[0]] && (
			<>
				{stages.map((stage, i) => (
					<Fragment key={i}>
					{tabAnimate && (<motion.div
						className='h-16 flex border-b border-indigo-700 border-dashed w-screen relative'
						key={i}
						style={style}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        	>
						{eventList[stage].map((event) => (
							<ScheduleDisplayEventItem
								key={event.presenter}
								event={event}
								timeDuration={timeDuration}
								eventDay={eventDay}
							/>
						))}
					</motion.div>)}
					</Fragment>
				))}
			</>
		)) || (
			<div className='h-16 flex items-center text-indigo-200 mt-20'>
				No events to display
			</div>
		)
	);
}

export default ScheduleDisplayEvent;
