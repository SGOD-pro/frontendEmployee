import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import Navbar2 from '../Navbar2'
import AddEmployee from './AddForm';
import Table from '../Table'

import { MdDeleteOutline } from "react-icons/md";
import { useEmpData } from '../../context';
import axios from 'axios';
function Employee() {
    const { empTableData, popEmp } = useEmpData()

    const [visibility, setVisibility] = useState('none')
    const popEmployee = (id) => {
        axios.get(`/api/employee/popEmp?id=${id}`)
            .then((response) => {
                popEmp(id)
                console.log(response);
            })
    }
    const columns = [
        {
            field: 'empId',
            headerName: 'Emp Id',
            sortable: false,
            width: 150,
        },
        {
            field: 'first_Name',
            headerName: 'First name',
            width: 120,
        },
        {
            field: 'middle_Name',
            headerName: 'Middle name',
            width: 120,
        },
        {
            field: 'last_Name',
            headerName: 'Last Name',
            width: 120,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 120,
        },
        {
            field: 'date_of_joining',
            headerName: 'D O J',
            width: 150,
        },
        {
            field: 'department',
            headerName: 'Department',
            width: 160,
        },
        {
            field: 'designation',
            headerName: 'Designation',
            width: 160,
        },
        {
            field: '',
            headerName: 'Actions',
            renderCell: (params) => (
                <button className='text-red-600 rounded-md text-3xl flex items-center' onClick={() => popEmployee(params.row.id)}><MdDeleteOutline /></button>
            ),
        },

    ];
    const rows=empTableData
    return (
        <>
            <Navbar2 name={['Add Employee']} to={['/employee']} />

            <div className='h-full w-full gap-5 pt-2 dark:text-zinc-200 relative'>
                <header className='flex justify-between items-center'>
                    <div className="flex gap-3">
                        <select name="" id="" className='bg-zinc-700 rounded-lg pr-3 p-1'>
                            <option value="">Select</option>
                        </select>
                        <select name="" id="" className='bg-zinc-700 rounded-lg pr-3 p-1'>
                            <option value="">Select</option>
                        </select>
                        <select name="" id="" className='bg-zinc-700 rounded-lg pr-3 p-1'>
                            <option value="">Select</option>
                        </select>
                        <button className="bg-zinc-700 rounded-md items-center justify-between gap-4 flex text-lg  px-3 py-1">More<CiCirclePlus /></button>
                        <button className="bg-red-200 rounded-md border border-red-600 text-lg text-red-600 px-3 py-1">Reset</button>
                    </div>
                    <button to='/employee/add-emp' className='bg-blue-600 rounded-md text-lg px-3 py-1 flex items-center gap-1' onClick={() => { setVisibility('block') }}>Add New <IoIosArrowDown className='text-xl' /></button>
                </header>

                <div className="w-full px-3 my-8 text-gray-100">
                    <Table columns={columns} rows={rows} />
                </div>

                {visibility && <AddEmployee visibility={{ visibility, setVisibility }}/>}
            </div>
        </>
    )
}

export default Employee