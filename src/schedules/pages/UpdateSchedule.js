import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

import NewScheduleList from "../components/NewScheduleList";
import FormControl from "../../shared/components/FormElements/FormControl";
import LogoUpload from "../../shared/components/FormElements/LogoUpload";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { isAfterToday } from "../../shared/util/calculate-dates";

import "react-datepicker/dist/react-datepicker.css";

const validateSchema = Yup.object().shape({
	logo: Yup.string().url("Something went wrong. Please try again"),
	title: Yup.string().required("Please enter the name of your event"),
	description: Yup.string()
		.min(10, "Please enter a longer description (minimum of 10 characters")
		.required("Please enter a brief description of your event"),
	startDate: Yup.date()
		.min(new Date(), "Date must be in the future")
		.required("A start date is required"),
	daysQty: Yup.number().required(
		"Please enter the number of days of your event"
	),
	scheduleList: Yup.array().of(
		Yup.object().shape({
			presenter: Yup.string().required(
				"Please enter the name of the presenter or artist"
			),
			startTime: Yup.string().required("A start time is required"),
			endTime: Yup.string().required("A finish time is required"),
			etitle: Yup.string(),
			stage: Yup.string().required("A venue/stage is required"),
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
  const [isFutureEvent, setIsFutureEvent] = useState(false);

	useEffect(() => {
		const fetchSchedule = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/schedules/${scheduleId}`
				);
				setLoadedSchedule(responseData.schedule);
				setStartDate(new Date(responseData.schedule.startDate));
			} catch (err) {
				console.log(err);
			}
		};
		fetchSchedule();
	}, [history, scheduleId, sendRequest]);
	
	useEffect(()=>{
		if (loadedSchedule) {
			const futureEvent = isAfterToday(loadedSchedule.startDate, loadedSchedule.daysQty);
			setIsFutureEvent(futureEvent);
		}
	// eslint-disable-next-line
	},[loadedSchedule])

	if (isLoading) {
		return <LoadingSpinner asOverlay={true} />;
	}

	if (!loadedSchedule && !error) {
		return (
			<div className='center w-11/12 max-w-2xl my-4 mx-auto mt-20'>
				<Card>
					<h2>Schedule could not be found</h2>
					<div className='inline pl-4 pt-6 center'>
						<Button default to={`/${auth.userId}/schedules`} className='center'>
							Return to Schedules
						</Button>
					</div>
				</Card>
			</div>
		);
  }
  
  if (loadedSchedule && !isFutureEvent && !error) {
		return (
			<div className='center w-11/12 max-w-2xl my-4 mx-auto mt-20'>
				<Card>
					<h2 className="text-center">This event has passed and cannot be edited.</h2>
					<div className='inline pl-4 pt-6 center'>
						<Button default to={`/${auth.userId}/schedules`} className='center'>
							Return to Schedules
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className='max-w-screen-md w-full mx-auto flex flex-col'>
			<ErrorModal error={error} onClear={clearError} />
			<h1 className='pl-8 mb-4'>Update Event</h1>
			<Formik
				initialValues={{
					logo: loadedSchedule.logo,
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
							`${process.env.REACT_APP_BACKEND_URL}/schedules/${scheduleId}`,
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
					<Form className='bg-gray-900 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full mt-20'>
						{isLoading && <LoadingSpinner asOverlay={true} />}
						<div className='flex flex-wrap -mx-3 mb-4'>
							<div className='w-full md:w-2/12 px-3 mb-6 md:mb-0'>
								<LogoUpload name='logo' label='Event Logo' value={values.logo} />
							</div>
							<div className="w-full md:pl-1 md:w-10/12">
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
											className='text-gray-400 block w-full'>
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
											className='form-input mt-1 block w-full bg-gray-800 text-gray-400 rounded-md border-none p-3'
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
							</div>
						</div>
						<h2 className='py-4'>Update Event List</h2>
						<NewScheduleList
							values={values}
							setFieldValue={setFieldValue}
							onChange={handleChange}
						/>
						<div className="pt-6 text-center">
							{Object.keys(errors).length > 0 && <p className='text-red-500 text-xs italic mr-4 mb-2'>The schedule has not been updated.<br/>Please view the errors in the form above.</p>}
							<Button default disabled={isSubmitting} type='submit'>Submit Event</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UpdatePlace;
