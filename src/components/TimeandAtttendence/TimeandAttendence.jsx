import React, { useEffect } from 'react'
import Navbar2 from '../Navbar2'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
function TimeandAttendence() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/time-attendance/shift');
  }, [])
  const location = useLocation();
  // if (location.pathname === '/time-attendance/') {
  //   navigate('/time-attendance/shift');
  // }
  return (
    <>
      <Navbar2 to={['/time-attendance/shift', '/time-attendance/holiday', '/time-attendance/leave', '/time-attendance/roster']} name={['shift', 'holiday', 'leave', 'roster']} />
      <div className='h-full w-full gap-5 pt-2 dark:text-zinc-200 relative'>
        <div className='p-3 bg-zinc-700 w-ful h-full rounded'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default TimeandAttendence