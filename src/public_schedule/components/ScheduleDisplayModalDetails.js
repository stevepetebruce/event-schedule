import React from "react";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Icon } from "@material-ui/core";
import SoundCloudIcon from "../../assets/icons/soundcloud-tile.svg";

function ScheduleDisplayModalDetails({ event }) {
	return (
		<div className='flex flex-col'>
			<div className='py-2 pr-2 m-2 overflow-y-scroll scrolling-touch'>
				{event.image && (
					<img
						className='float-right ml-4 my-2 w-full sm:w-3/12'
						src={event.image}
						alt={event.presenter}
					/>
				)}
				<p>{event.biography}</p>
			</div>

			<div className='py-2 m-2 flex flex-row'>
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
		</div>
	);
}

export default ScheduleDisplayModalDetails;
