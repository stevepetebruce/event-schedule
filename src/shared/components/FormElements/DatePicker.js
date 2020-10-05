import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePicker(props) {
	const { label, name, ...rest } = props;

	return (
		<>
			<label htmlFor={name} className='text-gray-500 block w-full'>
				{label}
			</label>
			<Field name={name}>
				{({ form, field }) => {
					const { setFieldValue } = form;
					const { value } = field;
					return (
						<DateView
							id={name}
							{...field}
							{...rest}
							selected={value}
							onChange={(val) => {
								setFieldValue(name, val);
							}}
							className='form-input mt-1 block w-full bg-gray-800 text-gray-400 rounded-md border-none p-3'
							dateFormat='dd/MM/yyyy'
						/>
					);
				}}
			</Field>
			<ErrorMessage name={name} component={TextError} />
		</>
	);
}

export default DatePicker;
