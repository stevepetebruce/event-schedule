import React from "react";
import { FieldArray, getIn, useFormikContext } from "formik";
import TimePicker from "rc-time-picker";
import moment from "moment";

import "../../assets/rc-time-picker.css";

import NewScheduleListDetails from "./NewScheduleListDetails";
import FormControl from "../../shared/components/FormElements/FormControl";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

function NewScheduleList(props) {
	const { values, errors, setFieldValue } = useFormikContext();

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
										<div className='w-full md:w-2/12 px-3 mb-6 md:mb-0'>
											<ImageUpload schedule={`scheduleList[${index}]`} />
										</div>
										<div className='w-full md:w-4/12 px-3 mb-6 md:mb-0'>
											<FormControl
												control='input'
												type='text'
												label='Band/Artist/Presenter'
												name={`scheduleList[${index}].presenter`}
												value={schedule.presenter}
											/>
										</div>
										<div className='w-full md:w-2/12 px-3 mb-6 md:mb-0'>
											<label
												htmlFor={`scheduleList[${index}].startTime`}
												className='text-gray-700'>
												Start Time
											</label>
											<TimePicker
												defaultValue={moment()}
												value={moment(`${schedule.startTime}`, "HH:mm")}
												showSecond={false}
												minuteStep={5}
												name={`scheduleList[${index}].startTime`}
												id={`scheduleList[${index}].startTime`}
												onChange={(value) => {
													setFieldValue(
														`scheduleList[${index}].startTime`,
														value.format("HH:mm"),
														false
													);
												}}
											/>
											<p className='text-red-500 text-xs italic'>
												{getIn(errors, `scheduleList[${index}].startTime`)}
											</p>
										</div>
										<div className='w-full md:w-2/12 px-3 mb-6 md:mb-0'>
											<label
												htmlFor={`scheduleList[${index}].endTime`}
												className='text-gray-700'>
												End Time
											</label>
											<TimePicker
												defaultValue={moment()}
												value={moment(`${schedule.endTime}`, "HH:mm")}
												showSecond={false}
												minuteStep={5}
												name={`scheduleList[${index}].endTime`}
												id={`scheduleList[${index}].endTime`}
												onChange={(value) => {
													setFieldValue(
														`scheduleList[${index}].endTime`,
														value.format("HH:mm"),
														false
													);
												}}
											/>
											<p className='text-red-500 text-xs italic'>
												{getIn(errors, `scheduleList[${index}].endTime`)}
											</p>
										</div>
										<div
											className='w-full md:w-2/12 px-3 mb-6 md:mb-0'
											style={{ position: "relative" }}>
											{props.values.daysQty > 1 ? (
												<FormControl
													control='select'
													label='Day'
													name={`scheduleList[${index}].day`}
													options={props.values.daysQty}
													value={schedule.day}
												/>
											) : null}
										</div>
									</div>

									<NewScheduleListDetails schedule={schedule} index={index} />

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
							push({
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
							})
						}>
						Add to list
					</button>
				</>
			)}
		/>
	);
}

export default NewScheduleList;
