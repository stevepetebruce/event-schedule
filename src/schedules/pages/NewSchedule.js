import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as Yup from "yup";

import NewScheduleList from "../components/NewScheduleList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

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
			startTime: Yup.string().required("A start time is required"),
			endTime: Yup.string()
				.required("A finish time is required")
				.test("is-greater", "Should be later than start time", function (
					value
				) {
					const { startTime } = this.parent;
					return moment(value, "HH:mm").isAfter(moment(startTime, "HH:mm"));
				}),
			etitle: Yup.string(),
			stage: Yup.string(),
			day: Yup.number().required("Please select the day"),
			socialList: Yup.object().shape({
				facebook: Yup.string().url("A enter a valid link, including https://"),
				twitter: Yup.string().url("A enter a valid link, including https://"),
				youtube: Yup.string().url("A enter a valid link, including https://"),
				soundcloud: Yup.string().url(
					"A enter a valid link, including https://"
				),
			}),
		})
	),
});

const NewSchedule = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [startDate, setStartDate] = useState(new Date());

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
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
							startTime: moment().format("HH:mm"),
							endTime: moment().format("HH:mm"),
							day: 1,
							biography: "",
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
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting({ ...values, ...{ creator: auth.userId } });

					try {
						await sendRequest(
							"http://localhost:5000/api/schedules",
							"POST",
							JSON.stringify({ ...values, ...{ creator: auth.userId } }),
							{ "Content-Type": "application/json" }
						);
						history.push("/");
					} catch (error) {
						console.log(error);
					}
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
						{isLoading && <LoadingSpinner asOverlay={true} />}
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
								<label
									htmlFor='startDate'
									className='text-gray-700 block w-full'>
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
									<p className='text-red-500 text-xs italic'>
										{errors.daysQty}
									</p>
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
					</Form>
				)}
			</Formik>
		</>
	);
};

export default NewSchedule;
