import React from "react";
import { Field, FieldArray, getIn, useFormikContext } from "formik";

function NewScheduleList(props) {
	const { values, handleChange, errors } = useFormikContext();

	return (
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
												id='presenter'
												name={`scheduleList.[${index}].presenter`}
												className='form-input mt-1 block w-full'
												value={schedule.presenter}
												onChange={handleChange}
											/>
											<p className='text-red-500 text-xs italic'>
												{getIn(errors, `scheduleList.[${index}].presenter`)}
											</p>
										</div>
										<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
											<label
												htmlFor={`scheduleList.[${index}].etitle`}
												className='text-gray-700'>
												Event title{" "}
												<span className='text-gray-500'>(Optional)</span>
											</label>
											<Field
												type='text'
												id='etitle'
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
												Venue/Stage
												<span className='text-gray-500'>(Optional)</span>
											</label>
											<Field
												type='text'
												id='stage'
												name={`scheduleList.[${index}].stage`}
												className='form-input mt-1 block w-full'
												value={schedule.stage}
											/>
											<p className='text-red-500 text-xs italic'>
												{getIn(errors, `scheduleList.[${index}].stage`)}
											</p>
										</div>
										<div
											className='w-full md:w-1/2 px-3 mb-6 md:mb-0'
											style={{ position: "relative" }}>
											{props.values.daysQty > 1 ? (
												<>
													<label
														htmlFor={`scheduleList.[${index}].day`}
														className='text-gray-700'>
														Day
													</label>
													<Field
														name={`scheduleList.[${index}].day`}
														id={`scheduleList.[${index}].day`}
														as='select'
														className='form-input mt-1 block w-full'>
														{[...Array(props.values.daysQty)].map((num, i) => (
															<option key={i + 1} value={i + 1}>
																{i + 1}
															</option>
														))}
													</Field>
													<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 pt-8 text-gray-700'>
														<svg
															className='fill-current h-4 w-4'
															xmlns='http://www.w3.org/2000/svg'
															viewBox='0 0 20 20'>
															<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
														</svg>
													</div>

													<p className='text-red-500 text-xs italic'>
														{getIn(errors, `scheduleList.[${index}].day`)}
													</p>
												</>
											) : null}
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
					<pre>{JSON.stringify(values, null, 2)}</pre>
					<pre>{JSON.stringify(errors, null, 2)}</pre>
					<button
						type='button'
						className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mb-6 border border-blue-500 hover:border-transparent rounded'
						onClick={() =>
							push({ presenter: "", etitle: "", stage: "", day: 1 })
						}>
						Add to list
					</button>
				</>
			)}
		/>
	);
}

export default NewScheduleList;
