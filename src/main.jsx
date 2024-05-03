import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'
import Employee from './components/Employee/Employee.jsx'
import TimeandAttendence from './components/TimeandAtttendence/TimeandAttendence.jsx'
import Shift from './components/TimeandAtttendence/Shift/Shift.jsx'
import Holiday from './components/TimeandAtttendence/Holiday/Holiday.jsx'
import Roster from './components/TimeandAtttendence/Roster.jsx'
import Leave from './components/TimeandAtttendence/Leave.jsx'
const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '',
      element: <Home />,
    },
    {
      path: 'employee',
      element: <Employee />,
    },
    {
      path: 'time-attendance',
      element: <TimeandAttendence />,
      children:[
        {
          path: 'shift',
          element: <Shift />,
        },
        {
          path: 'holiday',
          element: <Holiday />,
        },
        {
          path: 'roster',
          element: <Roster />,
        },
        {
          path: 'leave',
          element: <Leave />,
        },
      ]
    },
  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
