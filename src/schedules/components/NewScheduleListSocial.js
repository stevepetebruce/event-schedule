import React from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Icon } from "@material-ui/core";
import SoundCloudIcon from "../../assets/icons/soundcloud-tile.svg";

import SocialInput from "../../shared/components/FormElements/SocialInput";

import "./NewScheduleListSocial.css";

function NewScheduleListSocial({ schedule }) {
	console.log("ttt", schedule);
	return (
		<>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 flex content-center'>
					<SocialInput
						schedule={schedule}
						social='facebook'
						icon={<FacebookIcon htmlColor='#3b5998' fontSize='large' />}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 flex justify-start'>
					<SocialInput
						schedule={schedule}
						social='twitter'
						icon={<TwitterIcon htmlColor='#4099ff' fontSize='large' />}
					/>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 mb-4'>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 flex justify-start'>
					<SocialInput
						schedule={schedule}
						social='youtube'
						icon={<YouTubeIcon htmlColor='#c4302b' fontSize='large' />}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 flex justify-start'>
					<SocialInput
						schedule={schedule}
						social='soundcloud'
						icon={
							<Icon>
								<img
									src={SoundCloudIcon}
									height={25}
									width={30}
									alt='SoundCloud'
								/>
							</Icon>
						}
					/>
				</div>
			</div>
		</>
	);
}

export default NewScheduleListSocial;
