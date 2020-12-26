import React from 'react'
import { HashLink } from 'react-router-hash-link';

import moment from "moment";
import defaultImage from "../../assets/icons/no-image-icon.png"

function AccountScheduleItem({schedule, userId, key}) {
  return (
    <li className='my-0'>
      <HashLink smooth to={`/${userId}/schedules#${schedule.id}`}>
        <article key={key} className="p-4 flex space-x-4 hover:bg-gray-800">
          {schedule.logo ? <img src={schedule.logo} alt={schedule.title} className="flex-none w-12 h-12 rounded-lg object-cover bg-gray-800" /> : <img src={defaultImage} alt={schedule.title} className="flex-none w-12 h-12 rounded-lg object-cover bg-gray-800" />}
          <div className="min-w-0 relative flex-auto sm:pr-14 lg:pr-0 xl:pr-14">
            <h2 className="text-lg font-semibold mb-0.5">
              {schedule.title}
            </h2>
            <div className="flex flex-wrap whitespace-pre">
              <p className="text-gray-500">Date: {moment(schedule.startDate).format('DD/MM/YYYY')}</p>
            </div>
          </div>
        </article>
      </HashLink>
    </li>
  )
}

export default AccountScheduleItem
