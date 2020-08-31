import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as Yup from "yup";

import NewScheduleList from "../components/NewScheduleList";
import FormControl from "../../shared/components/FormElements/FormControl";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "react-datepicker/dist/react-datepicker.css";

const validateSchema = Yup.object().shape({
	title: Yup.string().required("Please enter the name of your event"),
	description: Yup.string()
		.min(10, "Please enter a longer description (minimum of 10 characters")
		.required("Please enter a brief description of your event"),
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

const UpdatePlace = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedSchedule, setLoadedSchedule] = useState();
	const scheduleId = useParams().scheduleId;
	const history = useHistory();
	const [startDate, setStartDate] = useState();

	useEffect(() => {
		const fetchSchedule = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/schedules/${scheduleId}`
				);
				setLoadedSchedule(responseData.schedule);
				setStartDate(new Date(responseData.schedule.startDate));
			} catch (err) {
				console.log(err);
			}
		};
		fetchSchedule();
	}, [history, scheduleId, sendRequest]);

	if (isLoading) {
		return <LoadingSpinner asOverlay={true} />;
	}

	if (!loadedSchedule && !error) {
		return (
			<div className='center'>
				<Card>
					<h2>Schedule could not be found</h2>
				</Card>
			</div>
		);
	}

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<Formik
				initialValues={{
					title: loadedSchedule.title,
					description: loadedSchedule.description,
					startDate: loadedSchedule.startDate,
					daysQty: loadedSchedule.daysQty,
					scheduleList: loadedSchedule.scheduleList,
				}}
				validationSchema={validateSchema}
				validateOnChange={false}
				validateOnBlur={false}
				enableReinitialize
				onSubmit={async (values, { setSubmitting }) => {
					setSubmitting({ values });
					try {
						await sendRequest(
							`http://localhost:5000/api/schedules/${scheduleId}`,
							"PATCH",
							JSON.stringify({ ...values }),
							{
								"Content-Type": "application/json",
								Authorization: "Bearer " + auth.token,
							}
						);
						history.push("/" + auth.userId + "/schedules");
					} catch (err) {
						console.log(err);
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
							<FormControl
								control='input'
								type='text'
								label='Title'
								name='title'
							/>
						</div>
						<div className='mb-4'>
							<FormControl
								control='textarea'
								label='Description'
								name='description'
								rows='3'
							/>
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
								<FormControl
									control='input'
									type='number'
									label='How many days is the event?'
									name='daysQty'
									min='1'
								/>
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

export default UpdatePlace;
