import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Examples from "../components/Examples"
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";


const Welcome = () => {
	const { isLoading, error, clearError } = useHttpClient();

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay={true} />
				</div>
			)}
			{!isLoading && 
			<div className='max-w-screen-md w-full mx-auto flex mt-24'>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center">
						<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Welcome to scheduled.live</h2>
						<h1 className='mb-4'>
							Set up your first schedule
						</h1>
						<p className="my-4 max-w-2xl text-gray-500 lg:mx-auto">
							Simply enter your event details and view your schedule.
						</p>
						<Button default to='/schedule/new'>
							Create Schedule
						</Button>
					</div>
					<Examples />

				</div>

			</div>
			}
		</>
	);
};

export default Welcome;
