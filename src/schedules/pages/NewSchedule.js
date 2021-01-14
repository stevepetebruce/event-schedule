import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import moment from "moment";
import * as Yup from "yup";

import NewScheduleList from "../components/NewScheduleList";
import LogoUpload from "../../shared/components/FormElements/LogoUpload";
import FormControl from "../../shared/components/FormElements/FormControl";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

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
			image: Yup.string().url("Something went wrong. Please try again"),
			imagethmb: Yup.string().url("Something went wrong. Please try again"),
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

const NewSchedule = () => {
	const auth = useContext(AuthContext);
	const history = useHistory();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	return (
		<div className='max-w-screen-md w-full mx-auto flex flex-col mt-20'>
			<ErrorModal error={error} onClear={clearError} />
			<h1 className='pl-8 mb-4'>Add Event</h1>
			<Formik
				initialValues={{
					title: "",
					description: "",
					startDate: new Date(),
					daysQty: 1,
					logo: "",
					scheduleList: [
						{
							presenter: "",
							etitle: "",
							stage: "",
							startTime: moment().format("HH:mm"),
							endTime: moment().format("HH:mm"),
							image: "",
							imagethmb: "",
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
							process.env.REACT_APP_BACKEND_URL + "/schedules",
							"POST",
							JSON.stringify({ ...values, ...{ creator: auth.userId } }),
							{
								Authorization: "Bearer " + auth.token,
								"Content-Type": "application/json",
							}
						);
						history.push(`/${auth.userId}/schedules`);
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
					<Form className='bg-gray-900 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full'>
						{isLoading && <LoadingSpinner asOverlay={true} />}
						<div className='flex flex-wrap -mx-3 mb-4'>
							<div className='w-full md:w-2/12 px-3 mb-6 md:mb-0'>
								<LogoUpload name='logo' label='Event Logo' />
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
								<div className='flex flex-wrap -mx-3 mb-10'>
									<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
										<FormControl
											control='date'
											label='Start Date'
											name='startDate'
										/>
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
						<h2 className='py-4'>Add the Bands or Artists</h2>
						<NewScheduleList
							values={values}
							setFieldValue={setFieldValue}
							onChange={handleChange}
						/>
						<div className="pt-6 text-center">
							{Object.keys(errors).length > 0 && <p className='text-red-500 text-xs italic mr-4 mb-2'>The schedule has not been submitted.<br/>Please view the errors in the form above.</p>}
							<Button default disabled={isSubmitting} type='submit'>Submit Event</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default NewSchedule;
