import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function TextArea(props) {
	const { label, name, rows, ...rest } = props;
	return (
		<>
			<label htmlFor={name} className='text-gray-700'>
				{label}
			</label>
			<Field
				as='textarea'
				id={name}
				name={name}
				rows={rows}
				{...rest}
				className='form-textarea mt-1 block w-full'
			/>
			<ErrorMessage name={name} component={TextError} />
		</>
	);
}

export default TextArea;
