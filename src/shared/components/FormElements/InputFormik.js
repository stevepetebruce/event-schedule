import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function inputFormik(props) {
	const { label, name, ...rest } = props;
	return (
		<>
			<label htmlFor={name} className='text-gray-500'>
				{label}
			</label>
			<Field
				id={name}
				name={name}
				{...rest}
				className='form-input mt-1 block w-full bg-gray-800 text-gray-400 rounded-md border-none p-3'
			/>
			<ErrorMessage name={name} component={TextError} />
		</>
	);
}

export default inputFormik;
