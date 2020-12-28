import React from "react";
import Collapsible from "react-collapsible";

import FormControl from "../../shared/components/FormElements/FormControl";
import NewSheduleListSocial from "./NewScheduleListSocial";

import "../../shared/components/UIElements/Collapsible.css"

function NewScheduleListDetails({ schedule, index }) {
	return (
		<Collapsible trigger='Add event information and social media links'>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full px-3 mb-6 md:mb-0'>
					<FormControl
						control='input'
						type='text'
						label={
							<>
								Event title <span className='text-gray-700'>(Optional)</span>
							</>
						}
						name={`scheduleList[${index}].etitle`}
						value={schedule.etitle}
					/>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full px-3 mb-6 md:mb-0'>
					<div className='mb-4'>
						<FormControl
							control='textarea'
							label={
								<>
									Artist/Band biography{" "}
									<span className='text-gray-700'>(Optional)</span>
								</>
							}
							name={`scheduleList[${index}].biography`}
							rows='3'
							value={schedule.biography}
						/>
					</div>
				</div>
			</div>
			<NewSheduleListSocial schedule={schedule} index={index} />
		</Collapsible>
	);
}

export default NewScheduleListDetails;
