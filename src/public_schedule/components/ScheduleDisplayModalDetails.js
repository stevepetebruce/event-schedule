import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';

const container = {
	hidden: { opacity: 0, y: 30 },
	show: {
		opacity: 1,
		y: 0,
		transition: {
			ease: "easeOut",
			duration: 0.5,
			delay:  0.5,
			staggerChildren: 0.5,
		}
	}
}

const item = {
	hidden: { opacity: 0, y: 30, },
	show: { 
		opacity: 1, 
		y: 0, 
		transition: {
			ease: "easeOut",
			duration: 0.5,
		}
	}
}

function ScheduleDisplayModalDetails({ event, show }) {
	return (
		<div className='flex flex-col h-full'>
			<div className='pb-32 md:px-6 flex-1 overflow-y-auto scrolling-touch'>
			<AnimatePresence>
				{event.image && (
					<motion.img
						className='float-right ml-4 my-2 pb-4 w-full sm:w-2/4'
						src={event.image}
						alt={event.presenter}
            key={uuidv4()}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, 
							transition: {
								ease: "easeOut",
								delay:  0.3,
								duration: 0.7,}
							}
						}
					/>
				)}
				{show && (
					<motion.div
						variants={container}
						initial="hidden"
						animate="show"
            key={uuidv4()}
					>
						<motion.h2 className="py-2" variants={item}>
							{event.presenter}
						</motion.h2>
						<motion.h3 variants={item}>
							{event.stage} @ {event.startTime}
						</motion.h3>
						<motion.p className="whitespace-pre-line py-6" variants={item}>
							{event.biography}
						</motion.p>
					</motion.div>
				)}	
			</AnimatePresence>	
			</div>
		</div>
	);
}

export default ScheduleDisplayModalDetails;
