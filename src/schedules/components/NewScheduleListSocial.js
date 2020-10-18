import React from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Icon } from "@material-ui/core";
import SoundCloudIcon from "../../assets/icons/soundcloud-tile.svg";

import FormControl from "../../shared/components/FormElements/FormControl";

import "./NewScheduleListSocial.css";

function NewScheduleListSocial({ schedule, index }) {
	return (
		<>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 flex content-center'>
					<FormControl
						control='input'
						type='text'
						label={
							<div className='pt-2'>
								<FacebookIcon htmlColor='#3b5998' fontSize='large' />
							</div>
						}
						name={`scheduleList[${index}].socialList.facebook`}
						value={schedule.socialList.facebook}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 flex justify-start'>
					<FormControl
						control='input'
						type='text'
						label={
							<div className='pt-2'>
								<TwitterIcon htmlColor='#4099ff' fontSize='large' />
							</div>
						}
						name={`scheduleList[${index}].socialList.twitter`}
						value={schedule.socialList.twitter}
					/>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 flex justify-start'>
					<FormControl
						control='input'
						type='text'
						label={
							<div className='pt-2'>
								<YouTubeIcon htmlColor='#c4302b' fontSize='large' />
							</div>
						}
						name={`scheduleList[${index}].socialList.youtube`}
						value={schedule.socialList.youtube}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 flex justify-start'>
					<FormControl
						control='input'
						type='text'
						label={
							<div className='pt-2 mr-1 ml-1'>
								<Icon>
									<img
										src={SoundCloudIcon}
										height={25}
										width={30}
										alt='SoundCloud'
									/>
								</Icon>
							</div>
						}
						name={`scheduleList[${index}].socialList.soundcloud`}
						value={schedule.socialList.soundcloud}
					/>
				</div>
			</div>
		</>
	);
}

export default NewScheduleListSocial;
