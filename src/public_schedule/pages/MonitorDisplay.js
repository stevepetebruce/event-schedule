import React from "react";

function MonitorDisplay() {
	return (
		<div class='h-screen overflow-hidden w-full'>
			<div className='px-20 pb-14 mx-auto flex justify-between content-center items-center flex-col sm:flex-row h-full'>
				<div className='flex flex-col flex-grow justify-center sm:items-start pb-12'>
					<div className='py-2 px-4 bg-red-600 text-gray-100 font-bold mb-2'>
						UP NEXT
					</div>
					<h4 className='my-2 text-4xl md:text-5xl text-indigo-600 font-bold leading-tight text-center sm:text-left'>
						13:00 - 13:30
					</h4>
					<h1 className='text-4xl md:text-5xl text-indigo-200 pr-2 font-bold leading-tight text-center sm:text-left'>
						Band Name
					</h1>
					<p className='my-10 leading-normal md:text-2xl mb-8 text-center sm:text-left'>
						Main Stage
					</p>
				</div>
				<div className='flex-grow-0 w-2/5'>Image location</div>
			</div>
		</div>
	);
}

export default MonitorDisplay;
