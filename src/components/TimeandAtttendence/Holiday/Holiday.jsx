import React, { useState, useRef, useEffect } from 'react'
import { IoIosArrowDown, IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import Table from "../../Table"
import { MdDeleteOutline } from "react-icons/md";
import AddForm from './AddForm';
import axios from 'axios';
import { toast } from 'react-toastify';
function Holiday() {
  const [visibility, setVisibility] = useState(false)
  const year = useRef(null)
  const status = useRef(null)
  const [rows, setRows] = useState([])
  const toasterObj = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const popHoliday = (id) => {
    axios.get(`/api/timeAtt/popHoliday?id=${id}`)
      .then(response => {
        if (!response.data.success) {
          throw new Error();
        }
        toast.success(response.data.message, toasterObj)
      }).catch(er => toast.error("Something went wrong!", toasterObj))
    setRows(prev => (prev.filter(item => (item.id !== id))))
  }

  const columns = [
    {
      field: 'listName',
      headerName: 'List Name',
      width: 150,
    },
    {
      field: 'holidayName',
      headerName: 'Holiday Name',
      width: 150,
    },
    {
      field: 'holidayType',
      headerName: 'Holiday Type',
      width: 150,
      editable: true,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
    },
    {
      field: 'departments',
      headerName: 'Department',
      width: 250,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      width: 250,
    },
    {
      field: '',
      headerName: 'Actions',
      renderCell: (params) => (
        <button className='text-red-600 rounded-md text-3xl flex items-center' onClick={() => popHoliday(params.row.id)}><MdDeleteOutline /></button>
      ),
    },
  ];


  const filterHoliday = () => {
    axios.get(`/api/timeAtt/getHoliday?year=${year.current.value}&status=${status.current.value}`)
      .then(response => {
        if (!response.data.success) return;
        console.log(response.data.data);
        setRows(response.data.data)
      }).catch(error => {
        toast.error('Internal problem occurs!', toasterObj);
      })
  }

  useEffect(() => {
    axios.get(`/api/timeAtt/getHoliday?year=${year.current.value}&status=${status.current.value}`)
      .then(response => {
        if (!response.data.success) return;
        console.log(response.data.data);
        setRows(response.data.data)
      }).catch(error => {
        toast.error('Internal problem occurs!', toastObj);
      })
  }, [])

  return (
    <>
      <header className='flex justify-between items-center'>
        <h1 className=' capitalize font-bold text-3xl'>holiday details</h1>
        <div className="flex gap-3">
          <div className="relative">
            <label htmlFor="" className=' absolute -top-0 -translate-x-1/2 left-1/2 -translate-y-1/2 capitalize tracking-tight text-xs bg-zinc-700 px-2'>year</label>
            <select name="" id="" className='border-blue-600 bg-transparent border-2 rounded-md text-lg px-3 py-1 flex items-center gap-1 outline-none' ref={year} onChange={filterHoliday} defaultValue={new Date().getFullYear()}>
              <option value='2024' className=' bg-zinc-600'>2024</option>
              <option value='2025' className=' bg-zinc-600'>2025</option>
              <option value='2026' className=' bg-zinc-600'>2026</option>
            </select>
          </div>
          <div className="relative">
            <label htmlFor="" className=' absolute -top-0 -translate-x-1/2 left-1/2 -translate-y-1/2 capitalize tracking-tight text-xs bg-zinc-700 px-2'>status</label>
            <select name="" id="" className='border-blue-600 bg-transparent border-2 rounded-md text-lg px-3 py-1 flex items-center gap-1 outline-none' ref={status} onChange={filterHoliday} defaultValue="null">
              <option value="null" className=' bg-zinc-600'>All</option>
              <option value="state" className=' bg-zinc-600'>State</option>
              <option value="national" className=' bg-zinc-600'>National</option>
            </select>
          </div>
          <button to='/employee/add-emp' className='bg-blue-600 rounded-md text-lg px-3 py-1 flex items-center gap-1' onClick={() => { setVisibility('block') }}>Add Holiday <IoIosArrowDown className='text-xl' /></button>
        </div>
      </header>
      {visibility && <AddForm visibility={{ visibility, setVisibility }} style={{ width: '70%', col: 4 }} row={{ rows, setRows }} />}
      <div className="mt-3">
        <Table columns={columns} rows={rows} />
      </div>
    </>
  )
}

export default Holiday