import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

import "react-datepicker/dist/react-datepicker.css";

const validateSchema = Yup.object().shape({
	title: Yup.string().required("Please enter the name of your event"),
	description: Yup.string()
		.min(10, "Please enter a longer description (minimum of 10 characters")
		.required("Please enter a brief description of your event"),
	address: Yup.string(),
	startDate: Yup.date().required("A start date is required"),
	endDate: Yup.date().required(
		"An end date is required, even if it's the same date"
	),
});

const NewSchedule = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date(startDate));

	return (
		<Formik
			initialValues={{
				title: "",
				description: "",
				address: "",
				startDate: "",
				endDate: "",
			}}
			validationSchema={validateSchema}
			validateOnChange={false}
			validateOnBlur={false}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(true);
				// commit async call
				console.log(values);
				setSubmitting(false);
			}}>
			{({ values, isSubmitting, setFieldValue, touched, errors }) => (
				<Form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full'>
					<div className='mb-4'>
						<label htmlFor='title' className='text-gray-700'>
							Title
						</label>
						<Field
							type='text'
							id='title'
							name='title'
							className='form-input mt-1 block w-full'
						/>
						{errors.title && touched.title ? (
							<p className='text-red-500 text-xs italic'>{errors.title}</p>
						) : null}
					</div>
					<div className='mb-4'>
						<label htmlFor='description' className='text-gray-700'>
							Description
						</label>
						<Field
							component='textarea'
							className='form-textarea mt-1 block w-full'
							rows='3'
							id='description'
							name='description'
						/>
						{errors.description && touched.description ? (
							<p className='text-red-500 text-xs italic'>
								{errors.description}
							</p>
						) : null}
					</div>
					<div className='mb-4'>
						<label htmlFor='address' className='text-gray-700'>
							Address
						</label>
						<Field
							type='text'
							id='address'
							name='address'
							className='form-input mt-1 block w-full'
						/>
						{errors.address && touched.address ? (
							<p className='text-red-500 text-xs italic'>{errors.address}</p>
						) : null}
					</div>
					<div className='flex flex-wrap -mx-3 mb-4'>
						<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
							<label htmlFor='startDate' className='text-gray-700 block w-full'>
								Start Date
							</label>
							<DatePicker
								selected={startDate}
								onChange={(startDate) => {
									setFieldValue("startDate", startDate);
									setStartDate(startDate);
									setEndDate(startDate);
								}}
								selectsStart
								startDate={startDate}
								endDate={endDate}
								dateFormat='dd/MM/yyyy'
								name='startDate'
								className='form-input mt-1 block w-full'
							/>
							{errors.startDate && touched.startDate ? (
								<p className='text-red-500 text-xs italic'>
									{errors.startDate}
								</p>
							) : null}
						</div>
						<div className='w-full md:w-1/2 px-3'>
							<label htmlFor='endDate' className='text-gray-700 block w-full'>
								End Date
							</label>
							<DatePicker
								selected={endDate}
								onChange={(endDate) => {
									setFieldValue("endDate", endDate);
									setEndDate(endDate);
								}}
								selectsEnd
								startDate={startDate}
								endDate={endDate}
								minDate={startDate}
								dateFormat='dd/MM/yyyy'
								name='endDate'
								className='form-input mt-1 block w-full'
							/>
							{errors.endDate && touched.endDate ? (
								<p className='text-red-500 text-xs italic'>{errors.endDate}</p>
							) : null}
						</div>
					</div>

					<button
						disabled={isSubmitting}
						type='submit'
						className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
						Add Schedule
					</button>
					<pre>{JSON.stringify(values)}</pre>
				</Form>
			)}
		</Formik>
	);
};

export default NewSchedule;
