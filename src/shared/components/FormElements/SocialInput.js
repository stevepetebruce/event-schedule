import React from "react";
import { Field, getIn, useFormikContext } from "formik";

function SocialInput(props) {
	const { errors } = useFormikContext();
	return (
		<>
			<div className='w-1/6 flex pt-2'>
				<label htmlFor={`${props.schedule}.socialList.${props.social}`}>
					{props.icon}
				</label>
			</div>
			<div className='w-5/6'>
				<Field
					className='form-input mt-1 block w-full'
					type='text'
					id={`${props.schedule}.socialList.${props.social}`}
					name={`${props.schedule}.socialList.${props.social}`}
				/>
				<p className='text-red-500 text-xs italic'>
					{getIn(errors, `${props.schedule}.socialList.${props.social}`)}
				</p>
			</div>
		</>
	);
}

export default SocialInput;
