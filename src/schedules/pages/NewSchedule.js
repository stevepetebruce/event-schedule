import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as Yup from "yup";

import "./ScheduleForm.css";
import "../../shared/components/FormElements/Input.css";
import "react-datepicker/dist/react-datepicker.css";

const validateSchema = Yup.object().shape({
	title: Yup.string().required("Please enter the name of your event"),
	description: Yup.string()
		.min(10)
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
				<Form className='place-form'>
					<label htmlFor='title'>Title</label>
					<Field type='text' id='title' name='title' />
					{errors.title && touched.title ? <div>{errors.title}</div> : null}
					<label htmlFor='description'>Description</label>
					<Field type='text' id='description' name='description' />
					{errors.description && touched.description ? (
						<div>{errors.description}</div>
					) : null}

					<label htmlFor='address'>Address</label>
					<Field type='text' id='address' name='address' />
					{errors.address && touched.address ? (
						<div>{errors.address}</div>
					) : null}
					<label htmlFor='startDate'>Start Date</label>
					<DatePicker
						selected={startDate}
						onChange={(startDate) => {
							setFieldValue(
								"startDate",
								moment(startDate).format("DD MM YYYY")
							);
							setStartDate(startDate);
							setEndDate(startDate);
						}}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						dateFormat='dd/MM/yyyy'
						name='startDate'
					/>
					{errors.startDate && touched.startDate ? (
						<div>{errors.startDate}</div>
					) : null}
					<label htmlFor='endDate'>End Date</label>
					<DatePicker
						selected={endDate}
						onChange={(endDate) => {
							setFieldValue("endDate", moment(endDate).format("DD MM YYYY"));
							setEndDate(endDate);
						}}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						dateFormat='dd/MM/yyyy'
						name='endDate'
					/>
					{errors.endDate && touched.endDate ? (
						<div>{errors.endDate}</div>
					) : null}

					<button disabled={isSubmitting} type='submit'>
						Add Schedule
					</button>
					<pre>{JSON.stringify(values)}</pre>
				</Form>
			)}
		</Formik>
	);
};

export default NewSchedule;
