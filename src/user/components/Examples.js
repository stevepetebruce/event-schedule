import React from 'react'

import Button from "../../shared/components/FormElements/Button";
import {Tv, ViewList}  from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
		color: '#4B5563',
		fontSize: "80px"
  },
});

function Examples(props) {
  const classes = useStyles(props);

  return (
    <div className="mt-20">
      <h3 className='mb-4 text-center'>
        View an example schedule
      </h3>
      <div className="flex flex-row justify-evenly text-center mb-4">
        <div className="flex flex-col items-center rounded-lg border border-gray-700 w-56 pb-3 mx-1">
          <ViewList 
            fontSize="inherit"
            className={classes.root}  />
          <div className="pl-4">
            <Button href="https://www.app.scheduled.live/timetable/5fc644e33869900017b2fb5b" inverse size="small" target="_blank" rel="noopener noreferrer">
              VIEW SCHEDULE
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-lg border border-gray-700 w-56 pb-3 mx-1">
          <Tv
            fontSize="inherit"
            className={classes.root} />
          <div className="pl-4">
            <Button href="https://www.app.scheduled.live/display/5fc644e33869900017b2fb5b/1?stage=Main%20Stage" inverse size="small" target="_blank" rel="noopener noreferrer">
              VIEW DISPLAY
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Examples
