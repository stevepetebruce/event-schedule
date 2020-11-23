import React from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Icon } from "@material-ui/core";
import SoundCloudIcon from "../../assets/icons/soundcloud-tile.svg";

function ScheduleDisplayModalFooter({ event }) {
	return (
		<div className='py-3 px-2 md:px-6 flex flex-row absolute inset-x-0 bottom-0 bg-gray-900'>
			{event.socialList.facebook && (
				<a
					href={event.socialList.facebook}
					target='_blank'
					rel='noopener noreferrer'
					className='mx-2'>
					<FacebookIcon htmlColor='#3b5998' fontSize='large' />
				</a>
			)}
			{event.socialList.twitter && (
				<a
					href={event.socialList.twitter}
					target='_blank'
					rel='noopener noreferrer'
					className='mx-2'>
					<TwitterIcon htmlColor='#4099ff' fontSize='large' />
				</a>
			)}
			{event.socialList.youtube && (
				<a
					href={event.socialList.youtube}
					target='_blank'
					rel='noopener noreferrer'
					className='mx-2'>
					<YouTubeIcon htmlColor='#c4302b' fontSize='large' />
				</a>
			)}
			{event.socialList.soundcloud && (
				<a
					href={event.socialList.soundcloud}
					target='_blank'
					rel='noopener noreferrer'
					className='ml-3 mt-2'>
					<Icon>
						<img
							src={SoundCloudIcon}
							height={22}
							width={26}
							alt='SoundCloud'
						/>
					</Icon>
				</a>
			)}
		</div>
	);
}

export default ScheduleDisplayModalFooter;
