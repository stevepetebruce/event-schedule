import React from "react";
import { FieldArray, getIn, useFormikContext } from "formik";
import TimePicker from "rc-time-picker";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

import "../../assets/rc-time-picker.css";
import "../../shared/components/FormElements/TimePicker.css";

import Button from "../../shared/components/FormElements/Button";
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
						<AnimatePresence initial={false}>
						{values.scheduleList.map((schedule, index) => {
							return (
								<motion.div
									key={index}
									className='border border-gray-600 border-solid bg-gray-900 rounded-lg px-4 py-2 mb-6 flex flex-col justify-between leading-normal relative'
									layout
									initial={{ opacity: 0, y: 50, scale: 0.3 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									transition={{ delay: 0.2 }}
									exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.3 } }}>
									<div className='flex flex-wrap -mx-3 mb-4'>
										<div className='w-full md:w-2/12 px-3 mb-6 md:mb-0'>
											<ImageUpload schedule={schedule} index={index} />
										</div>
										<div className="flex flex-col w-full md:w-10/12">
											<div className="flex flex-row">
												<div className='w-full md:w-1/2 px-3 mb-6 md:mb-4'>
													<FormControl
														control='input'
														type='text'
														label='Band/Artist/Presenter'
														name={`scheduleList[${index}].presenter`}
														value={schedule.presenter}
													/>
												</div>
												<div className='w-full md:w-1/2 px-3 mb-6 md:mb-4'>
													<FormControl
														control='input'
														type='text'
														label={<>Venue/Stage</>}
														name={`scheduleList[${index}].stage`}
														value={schedule.stage}
													/>
												</div>
											</div>
											<div className="flex flex-row">
												<div className='w-full md:w-4/12 px-3 mb-6 md:mb-4'>
													<label
														htmlFor={`scheduleList[${index}].startTime`}
														className='text-gray-500'>
														Start Time
													</label>
													<TimePicker
														defaultValue={moment()}
														value={moment(`${schedule.startTime}`, "HH:mm")}
														showSecond={false}
														minuteStep={5}
														name={`scheduleList[${index}].startTime`}
														id={`scheduleList[${index}].startTime`}
														className='text-gray-500'
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
												<div className='w-full md:w-4/12 px-3 mb-6 md:mb-4'>
													<label
														htmlFor={`scheduleList[${index}].endTime`}
														className='text-gray-500'>
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
													className='w-full md:w-4/12 px-3 mb-6 md:mb-4'
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
										</div>
									</div>
									<NewScheduleListDetails schedule={schedule} index={index} />
									<span className='absolute top-0 right-0 px-1 py-1'>
										<svg
											className='fill-current h-6 w-6'
											role='button'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 20 20'
											onClick={() => remove(index)}>
											<title>Close</title>
											<path fill="#5a67d8" d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
										</svg>
									</span>
								</motion.div>
							);
						})}
						</AnimatePresence>
					</div>
					<Button
						inverse
						type='button'
						onClick={() =>
							push({
								presenter: "",
								etitle: "",
								stage: "",
								startTime: moment().format("HH:mm"),
								endTime: moment().format("HH:mm"),
								day: 1,
								image: "",
								imagethmb: "",
								biography: "",
								socialList: {
									facebook: "",
									twitter: "",
									youtube: "",
									soundcloud: "",
								},
							})
						}>
						+ Add new artist / Band
					</Button>
				</>
			)}
		/>
	);
}

export default NewScheduleList;
