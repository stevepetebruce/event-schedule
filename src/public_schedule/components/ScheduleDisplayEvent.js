import React, { useEffect, useState } from "react";
import ScheduleDisplayEventItem from "./ScheduleDisplayEventItem";
import { motion } from "framer-motion"
import { v4 as uuidv4 } from 'uuid';

const container = {
	hidden: { opacity: 0, y: -10 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			ease: "easeOut",
			duration: 0.3,
			staggerChildren: 0.08,
		}
	}
}

const item = {
	hidden: { opacity: 0, y: -10, },
	show: { 
		opacity: 1, 
		y: 0, 
		transition: {
			ease: "easeOut",
			duration: 0.3,
		}
	}
}

const events = {
	hidden: { opacity: 0 },
	show: { 
		opacity: 1, 
		transition: {
			ease: "easeInOut",
			duration: 1,
			delay: 0.4
		}
	}
}

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
				{tabAnimate && (<motion.div
						variants={container}
						initial="hidden"
						animate="show"
					>
					{stages.map((stage, i) => (
			
							<motion.div
								className='h-16 flex border-b border-indigo-700 border-dashed w-screen relative'
								key={uuidv4()}
								style={style}
								variants={item}
							>
								{eventList[stage].map((event, i) => (
									<motion.div variants={events} key={uuidv4()}>
										<ScheduleDisplayEventItem
											event={event}
											timeDuration={timeDuration}
											eventDay={eventDay}
										/>
									</motion.div>
								))}
							</motion.div>
					
					))}
				</motion.div>)}
			</>
		)) || (
			<div className='h-16 flex items-center text-indigo-200 mt-20'>
				No events to display
			</div>
		)
	);
}

export default ScheduleDisplayEvent;
