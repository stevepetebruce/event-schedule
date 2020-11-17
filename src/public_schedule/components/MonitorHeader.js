import React, {useState} from 'react'

function ScheduleHeader({title}) {
  const time = new Date().toLocaleTimeString();
  const [currentTime, SetCurrentTime] = useState(time);

  const calcTime = () => {
    const ctime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    SetCurrentTime(ctime);
  };

  setInterval(() => {
    calcTime();
  }, 1000);

  return (
    <header className='flex w-full justify-between h-16 items-center fixed top-0 left-0 bg-gray-800 text-gray-600 px-20 z-10'>
      <h2>{title}</h2>
      <h2>{currentTime}</h2> 
    </header>
  )
}

export default ScheduleHeader;
