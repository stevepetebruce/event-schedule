import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function TextArea(props) {
	const { label, name, rows, ...rest } = props;
	return (
		<>
			<label htmlFor={name} className='text-gray-500'>
				{label}
			</label>
			<Field
				as='textarea'
				id={name}
				name={name}
				rows={rows}
				{...rest}
				className='form-textarea mt-1 block w-full bg-gray-800 text-gray-400 rounded-md border-none p-3'
			/>
			<ErrorMessage name={name} component={TextError} />
		</>
	);
}

export default TextArea;
