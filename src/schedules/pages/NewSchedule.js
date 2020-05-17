import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

import NewScheduleList from "../components/NewScheduleList";

import "react-datepicker/dist/react-datepicker.css";

const validateSchema = Yup.object().shape({
	title: Yup.string().required("Please enter the name of your event"),
	description: Yup.string()
		.min(10, "Please enter a longer description (minimum of 10 characters")
		.required("Please enter a brief description of your event"),
	address: Yup.string(),
	startDate: Yup.date().required("A start date is required"),
	daysQty: Yup.number().required(
		"Please enter the number of days of your event"
	),
	scheduleList: Yup.array().of(
		Yup.object().shape({
			presenter: Yup.string().required(
				"Please enter the name of the presenter or artist"
			),
			etitle: Yup.string(),
			stage: Yup.string(),
			day: Yup.number().required("Please select the day"),
		})
	),
});

const NewSchedule = () => {
	const [startDate, setStartDate] = useState(new Date());

	return (
		<Formik
			initialValues={{
				title: "",
				description: "",
				address: "",
				startDate: "",
				daysQty: 1,
				scheduleList: [
					{
						presenter: "",
						etitle: "",
						stage: "",
						day: 1,
						socialList: {
							facebook: "",
							twitter: "",
							youtube: "",
							soundcloud: "",
						},
					},
				],
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
			{({
				values,
				isSubmitting,
				setFieldValue,
				touched,
				errors,
				handleChange,
			}) => (
				<Form className='bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full'>
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
							Address <span className='text-gray-500'>(Optional)</span>
						</label>
						<Field
							type='text'
							id='address'
							name='address'
							className='form-input mt-1 block w-full'
						/>
						{errors.address ? (
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
								}}
								selectsStart
								startDate={startDate}
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
							<label htmlFor='daysQty' className='text-gray-700 block w-full'>
								How many days is the event?
							</label>
							<Field
								type='number'
								id='daysQty'
								name='daysQty'
								min='1'
								className='form-input mt-1 block w-full'
							/>
							{errors.daysQty ? (
								<p className='text-red-500 text-xs italic'>{errors.daysQty}</p>
							) : null}
						</div>
					</div>

					<NewScheduleList
						values={values}
						setFieldValue={setFieldValue}
						onChange={handleChange}
					/>

					<button
						disabled={isSubmitting}
						type='submit'
						className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
						Submit
					</button>
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</Form>
			)}
		</Formik>
	);
};

export default NewSchedule;
