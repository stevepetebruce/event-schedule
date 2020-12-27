import React, { useEffect, useState, useContext } from "react";

import AccountScheduleItem from "../components/AccountScheduleItem"
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card"
import Examples from "../components/Examples"
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Welcome = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedSchedules, setloadedSchedules] = useState();
  const auth = useContext(AuthContext);
  
  const fetchSchedules = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/schedules/user/${auth.userId}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setloadedSchedules(responseData.schedules);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(auth.userId && auth.token) fetchSchedules();
		// eslint-disable-next-line
  }, [auth.token, auth.userId]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay={true} />
				</div>
			)}
			{(!isLoading && (!loadedSchedules || loadedSchedules.length === 0)) && 
        <div className='max-w-screen-md w-full mx-auto flex mt-24'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Welcome to scheduled.live</h2>
              <h1 className='mb-4'>
                Set up your first schedule
              </h1>
              <p className="my-4 max-w-2xl text-gray-500 lg:mx-auto">
                Simply enter your event details and view your schedule.
              </p>
              <Card className='w-full p-12 '>
                <div className="text-center">
                  <Button default to='/schedule/new'>
                    Create Schedule
                  </Button>  
                </div>   
                <Examples />
              </Card>
            </div>
          </div>
        </div>
			}
      {(!isLoading && loadedSchedules && (loadedSchedules.length > 0)) && (
        <div className='max-w-screen-md w-full mx-auto flex mt-24'>
          <div className='w-11/12 max-w-2xl list-none my-4 mx-auto'>
            <div className="md:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Welcome back</h2>
              <h1 className='mb-4'>
                ...
              </h1>
            </div>
            <Card className='w-full p-12'>
              <h1 className='mb-4 lg:text-center'>
                My Schedules
              </h1>
              <ul className="divide-y divide-gray-700">
              {loadedSchedules.map((schedule, i) => 
                <AccountScheduleItem schedule={schedule} userId={auth.userId} key={i} />
              )}
              </ul> 
            </Card>
          </div>
        </div>
      )}
		</>
	);
};

export default Welcome;
