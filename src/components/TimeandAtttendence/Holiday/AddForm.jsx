import React, { useEffect, useState, useRef } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import InputField from '../Shift/InputField';
import axios from 'axios';
import { useEmpData } from '../../../context';
import { toast } from 'react-toastify';
import Checkboxes from './Checkboxes';
function AddForm(props) {
    const { width, col } = props.style
    const { rows, setRows } = props.row
    const [disabledBtn, setDisabledBtn] = useState(false)
    const { visibility, setVisibility } = props.visibility
    const { pushShiftTableData } = useEmpData()

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

    const [formData, setFormData] = useState({
        listName: ` FY ${new Date().getFullYear()}-${(new Date().getFullYear() % 100) + 1}`,
        holidayName: "",
        holidayType: "",
        date: "",
    });

    const [field1, setField1] = useState([
        { name: 'listName', type: 'text', imp: true, field: 'list name', placeHolder: "" },
        { name: 'holidayName', type: 'text', imp: true, field: 'holiday name', placeHolder: "" },

        { name: 'holidayType', type: 'select', imp: true, field: 'holiday type', placeHolder: "", options: ["national", 'state'] },
        { name: 'date', type: 'date', field: 'date', placeHolder: "", imp: true, },
    ]);

    const designations = [
        "Software Engineer",
        "Product Manager",
        "UI/UX Designer",
        "Data Scientist",
        "Business Analyst",
        "Quality Assurance Engineer",
        "Marketing Specialist",
        "Financial Analyst",
        "HR Manager",
        "Sales Representative"
    ];
    const [selectedDesignations, setSelectedDesignations] = useState([
        "Software Engineer",
        "Product Manager",
        "UI/UX Designer",
        "Data Scientist",
        "Business Analyst",
        "Quality Assurance Engineer",
        "Marketing Specialist",
        "Financial Analyst",
        "HR Manager",
        "Sales Representative"
    ]);
    const departments = [
        "Engineering",
        "Marketing",
        "Finance",
        "Human Resources",
        "Sales",
        "Research and Development",
        "Customer Service",
        "Information Technology",
        "Operations",
        "Legal"
    ]
    const [selectedDepartments, setSelectedDepartments] = useState([
        "Engineering",
        "Marketing",
        "Finance",
        "Human Resources",
        "Sales",
        "Research and Development",
        "Customer Service",
        "Information Technology",
        "Operations",
        "Legal"
    ]);

    function resetForm() {
        setFormData({
            holidayName: "",
            holidayType: "",
            date: "",
        })
    }

    const onSubmit = () => {
        const data = { ...formData, departments: selectedDesignations, designations: selectedDepartments }
        if (!formData.holidayType || formData.holidayType.trim() === "") {
            toast.warn("Select holiday type.", toasterObj)
        }
        console.log(data);
        setDisabledBtn(true);
        axios.post(`https://employeebackend-ikfc.onrender.com/api/timeAtt/addHoliday`, data)
            .then((response) => {
                const responseData = response.data;
                console.log(responseData);
                setDisabledBtn(false);
                if (!responseData.success) {
                    toast.error(responseData.message, toasterObj);
                    return;
                }
                console.log(responseData);
                console.log(responseData.data);
                setRows(prev => [...prev, responseData.data]);
                resetForm();
                toast.success(responseData.message, toasterObj);
            }).catch(error => { setDisabledBtn(false); toast.error("Internal server error.", toasterObj) })
    };



    return (
        <>
            <div className=" absolute top-0 left-0 w-full h-full rounded-lg flex items-center justify-center px-2 bg-[#7474740c] z-50" style={{ display: visibility }}>
                <div className="w-[99.1%] h-full rounded-lg backdrop-blur-[2px] flex items-center justify-center bg-[#3f3f3f3f] py-2">
                    <div action="" className='z-0 relative min-w-[450px] w-1/2 h-full rounded-lg bg-zinc-900 text-white flex flex-col overflow-hidden' style={{ width: width }}>
                        <header className='pt-4 pl-12 flex gap-1 h-12'>
                            <div className='absolute right-0 top-0 p-1 text-2xl cursor-pointer' onClick={() => { setVisibility('none') }}>
                                <IoIosCloseCircleOutline />
                            </div>

                        </header>

                        <div className={`w-full h-full bg-zinc-700`}>
                            <form className=" whitespace-nowrap h-full" onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit()
                            }}>
                                <div className={`w-full p-4 grid-cols-2 grid gap-y-3 gap-x-5`} style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}>
                                    {
                                        field1.map((items) => (
                                            <InputField params={items} key={items.name} state={{ formData, setFormData }} />
                                        ))
                                    }
                                </div>
                                <div className='w-full grid grid-cols-2 p-4 gap-y-3 gap-x-5'>
                                    <Checkboxes params={designations} states={{ selectedDesignations, setSelectedDesignations }} filedName="designations" />
                                    <Checkboxes params={departments} states={{ selectedDesignations: selectedDepartments, setSelectedDesignations: setSelectedDepartments }} filedName="departments" />
                                </div>
                                <footer className="absolute bottom-0 left-0 w-full bg-zinc-900 flex items-center justify-between py-2 px-2 text-blue-600">
                                    <h2 className='font-mono text-xl'>Add new holiday</h2>
                                    <div className="flex gap-2">
                                        <button type='reset' className={`rounded-md border-2 border-blue-600 px-3 py-1 ${(disabledBtn) && " cursor-not-allowed"}`} disabled={(disabledBtn)}>Reset</button>
                                        <button type='submit' className={`rounded-md text-zinc-900 font-semibold bg-blue-600 px-3 py-1 ${(disabledBtn) && " cursor-not-allowed"}`} disabled={(disabledBtn)}>Add</button>
                                    </div>
                                </footer>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddForm
