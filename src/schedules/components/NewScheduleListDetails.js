import React from "react";
import Collapsible from "react-collapsible";
import { Field } from "formik";

import FormControl from "../../shared/components/FormElements/FormControl";
import NewSheduleListSocial from "./NewScheduleListSocial";

function NewScheduleListDetails({ schedule, index }) {
	return (
		<Collapsible trigger='Add event information and social media links'>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<FormControl
						control='input'
						type='text'
						label={
							<>
								Event title <span className='text-gray-500'>(Optional)</span>
							</>
						}
						name={`scheduleList[${index}].etitle`}
						value={schedule.etitle}
					/>
				</div>

				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
					<label htmlFor={`${schedule}.stage`} className='text-gray-700'>
						Venue/Stage
						<span className='text-gray-500'>(Optional)</span>
					</label>
					<Field
						type='text'
						id={`${schedule}.stage`}
						name={`${schedule}.stage`}
						className='form-input mt-1 block w-full'
						value={schedule.stage}
					/>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full px-3 mb-6 md:mb-0'>
					<div className='mb-4'>
						<label htmlFor='biography' className='text-gray-700'>
							Artist/Band biography
							<span className='text-gray-500'>(Optional)</span>
						</label>
						<Field
							component='textarea'
							className='form-textarea mt-1 block w-full'
							rows='3'
							id={`${schedule}.biography`}
							name={`${schedule}.biography`}
							value={schedule.biography}
						/>
					</div>
				</div>
			</div>
			<NewSheduleListSocial schedule={schedule} />
		</Collapsible>
	);
}

export default NewScheduleListDetails;
