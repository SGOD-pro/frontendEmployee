import { useState, useRef, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { DataContextProvider } from "./context"
import axios from 'axios'
import formatISODate from "../src/utils/DateFormater"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [empTableData, setEmpTableData] = useState([])
  const [shiftTableData, setShiftTableData] = useState([])

  const toastObj = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  const pushNewData = (obj) => {
    setEmpTableData(prev => [...prev, obj]);
  }
  const pushShiftTableData = (obj) => {
    setShiftTableData(prev => [...prev, obj]);
  }
  const popShiftTableData = (idToDelete) => {
    const data = { id: idToDelete }
    setShiftTableData(prev => prev.filter(row => row.id !== idToDelete));
    axios.get(`https://employeebackend-ikfc.onrender.com/api/timeAtt/popshift?query=${encodeURIComponent(idToDelete)}`)
      .then(response => { response.data.success && toast.success(response.data.message, toastObj) })
      .catch(error => { toast.error("Internal server error.", toastObj) })
  }
  useEffect(() => {
    axios.get("https://employeebackend-ikfc.onrender.com/api/employee/table-deitails")
      .then(response => {
        toast.success(response.data.message, toastObj);
        if (!response.data.success) return;
        const data = response.data.data
        data.map(item => (item.date_of_joining ? (item.date_of_joining = formatISODate(item.date_of_joining)) : ""))
        setEmpTableData(null)
        setEmpTableData(response.data.data)
      }).catch(err => {
        toast.error('Internal problem occurs!', toastObj);
      })
  }, [])
  const fiterTableData = (obj) => {
    setShiftDetails(obj)
  }
  const popEmp = (id) => {
    setEmpTableData(prev => prev.filter(item => item.id !== id))``
  }
  return (
    <>
      <DataContextProvider value={{ empTableData, pushNewData, popEmp, shiftTableData, pushShiftTableData, popShiftTableData, fiterTableData }}>
        <Navbar />
        <ToastContainer />
        <div className="p-3 w-[100% - 6rem] h-screen dark:bg-zinc-800 ml-24 flex flex-col">
          <Header />
          <Outlet />
        </div>
      </DataContextProvider>
    </>
  )
}

export default App
