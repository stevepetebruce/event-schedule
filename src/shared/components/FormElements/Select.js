import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Select(props) {
	const { label, name, options, ...rest } = props;
	console.log([...Array(options)], name);
	return (
		<>
			<label htmlFor={name} className='text-gray-700'>
				{label}
			</label>
			<Field
				as='select'
				id={name}
				name={name}
				{...rest}
				className='form-input mt-1 block w-full'>
				{[...Array(options)].map((num, i) => (
					<option key={i + 1} value={i + 1}>
						{i + 1}
					</option>
				))}
			</Field>
			<div className='pointer-events-none absolute inset-y-0 right-0 flex px-6 pt-10 h-1 text-gray-700'>
				<svg
					className='fill-current h-4 w-4'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'>
					<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
				</svg>
			</div>
			<ErrorMessage name={name} component={TextError} />
		</>
	);
}

export default Select;