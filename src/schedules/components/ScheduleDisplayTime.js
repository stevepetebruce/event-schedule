import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper-bundle.min.css";

const ScheduleDisplayTime = ({ timeDuration }) => {
	return (
		<Swiper spaceBetween={0} slidesPerView={3} swipeToSlide={true}>
			{timeDuration.map((time) => (
				<SwiperSlide key={time} style={{ width: "300px" }}>
					<div className='border-blue-400 border-r-2 border-dotted h-auto'>
						{time}
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ScheduleDisplayTime;
