import React from "react";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	scheduleList: Yup.array().of(
		Yup.object().shape({
			presenter: Yup.string().required(
				"Please enter the name of the presenter or artist"
			),
			etitle: Yup.string(),
			stage: Yup.string(),
			day: Yup.number(),
		})
	),
});

const initialValues = {
	scheduleList: [{ presenter: "", etitle: "", stage: "", day: "" }],
};

function NewScheduleList() {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			validateOnChange={false}
			validateOnBlur={false}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(true);
				// commit async call
				console.log(values);
				setSubmitting(false);
			}}>
			{({ values, isSubmitting, touched, errors, handleChange }) => (
				<Form className='bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full'>
					<FieldArray
						name='scheduleList'
						render={({ insert, remove, push }) => (
							<>
								<div className='w-full'>
									{values.scheduleList.map((schedule, index) => {
										return (
											<div
												key={index}
												className='border border-gray-400 bg-white rounded-b lg:rounded px-4 py-2 mb-2 flex flex-col justify-between leading-normal relative'>
												<div className='flex flex-wrap -mx-3 mb-4'>
													<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
														<label
															htmlFor={`scheduleList.[${index}].presenter`}
															className='text-gray-700'>
															Band/Artist/Presenter
														</label>
														<Field
															type='text'
															name={`scheduleList.[${index}].presenter`}
															className='form-input mt-1 block w-full'
															value={schedule.presenter}
															onChange={handleChange}
														/>
														<p className='text-red-500 text-xs italic'>
															{getIn(
																errors,
																`scheduleList.[${index}].presenter`
															)}
														</p>
													</div>
													<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
														<label
															htmlFor={`scheduleList.[${index}].etitle`}
															className='text-gray-700'>
															Event title (optional)
														</label>
														<Field
															type='text'
															name={`scheduleList.[${index}].etitle`}
															className='form-input mt-1 block w-full'
															value={schedule.etitle}
														/>
														<p className='text-red-500 text-xs italic'>
															{getIn(errors, `scheduleList.[${index}].etitle`)}
														</p>
													</div>
												</div>
												<div className='flex flex-wrap -mx-3 mb-4'>
													<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
														<label
															htmlFor={`scheduleList.[${index}].stage`}
															className='text-gray-700'>
															Venue/Stage (optional)
														</label>
														<Field
															type='text'
															name={`scheduleList.[${index}].stage`}
															className='form-input mt-1 block w-full'
															value={schedule.stage}
														/>
														<p className='text-red-500 text-xs italic'>
															{getIn(errors, `scheduleList.[${index}].stage`)}
														</p>
													</div>
													<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
														<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
															<label
																htmlFor={`scheduleList.[${index}].day`}
																className='text-gray-700'>
																Date
															</label>
															<Field
																type='text'
																name={`scheduleList.[${index}].day`}
																className='form-input mt-1 block w-full'
																value={schedule.day}
															/>
															<p className='text-red-500 text-xs italic'>
																{getIn(errors, `scheduleList.[${index}].day`)}
															</p>
														</div>
													</div>
												</div>
												<span className='absolute top-0 right-0 px-1 py-1'>
													<svg
														className='fill-current h-6 w-6 text-blue-500 hover:text-blue-400'
														role='button'
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 20 20'
														onClick={() => remove(index)}>
														<title>Close</title>
														<path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
													</svg>
												</span>
											</div>
										);
									})}
								</div>

								<button
									type='button'
									className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mb-6 border border-blue-500 hover:border-transparent rounded'
									onClick={() =>
										push({ presenter: "", etitle: "", stage: "", day: "" })
									}>
									Add to list
								</button>
							</>
						)}
					/>

					<button
						disabled={isSubmitting}
						type='submit'
						className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
						Submit Schedule
					</button>
					<pre>{JSON.stringify(values, null, 2)}</pre>
					<pre>{JSON.stringify(errors, null, 2)}</pre>
				</Form>
			)}
		</Formik>
	);
}

export default NewScheduleList;
