import React from "react";

function ScheduleDisplayModalDetails({ event }) {
	return (
		<div className='flex flex-col h-full'>
			<div className='pb-32 md:px-6 flex-1 overflow-y-auto scrolling-touch'>
				{event.image && (
					<img
						className='float-right ml-4 my-2 w-full sm:w-3/12'
						src={event.image}
						alt={event.presenter}
					/>
				)}
				<h2 className="py-3">{event.presenter}</h2>
				<p className="whitespace-pre-line">{event.biography}</p>		
			</div>
		</div>
	);
}

export default ScheduleDisplayModalDetails;
