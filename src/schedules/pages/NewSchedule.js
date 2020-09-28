import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import moment from "moment";
import * as Yup from "yup";

import NewScheduleList from "../components/NewScheduleList";
import FormControl from "../../shared/components/FormElements/FormControl";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const validateSchema = Yup.object().shape({
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

	return (
		<div className='max-w-screen-md w-full mx-auto flex'>
			<ErrorModal error={error} onClear={clearError} />
			<Formik
				initialValues={{
					title: "",
					description: "",
					startDate: new Date(),
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
							{
								Authorization: "Bearer " + auth.token,
								"Content-Type": "application/json",
							}
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
		</div>
	);
};

export default NewSchedule;
