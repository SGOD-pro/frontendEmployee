import React, { useEffect, useState, useRef } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import InputField from './InputField';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEmpData } from '../../context';
function AddForm(props) {
    const [disabledBtn, setDisabledBtn] = useState(false)
    const { visibility, setVisibility } = props.visibility
    const fieldButton = ['Overview', 'Joining', 'salary']
    const [active, setActive] = useState([true, false, false])
    const { pushNewData } = useEmpData()
    const toasterObj = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }
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
    ]
    const [i, seti] = useState(0)
    const [empId, setEmpId] = useState(null)
    const activeHandeler = (i) => {
        const newActive = [...active];
        for (let index = 0; index < active.length; index++) {
            newActive[index] = (index === i);
        }
        setActive(newActive);
        seti(i)
        setFields(allFields[i])
    }

    const readOnlyTrue = (fields) => {
        return fields.map(field => ({ ...field, readOnly: true }));
    };
    const readOnlyFalse = (fields) => {
        return fields.map(field => ({ ...field, readOnly: false }));
    };

    const [formData1, setFormData1] = useState({
        first_Name: "",
        middle_Name: "",
        last_Name: "",
        date_of_birth: "",
        gender: "",
        postal_Code: "",
        address: "",
        emailId: "",
        whatsappNo: "",
        addhar: "",
        pan: "",
    });
    const [formData2, setFormData2] = useState({

    }
    );
    const [formData3, setFormData3] = useState({
    }
    );

    const [field1, setField1] = useState([
        { name: 'first_Name', type: 'text', imp: true, readOnly: false },
        { name: 'middle_Name', type: 'text', imp: false, readOnly: false },
        { name: 'last_Name', type: 'text', imp: true, readOnly: false },
        { name: 'date_of_birth', type: 'date', imp: true, readOnly: false },
        { name: 'gender', type: 'select', imp: true, options: ['male', 'female', 'others'], readOnly: false },
        { name: 'postal_Code', type: 'number', imp: true, readOnly: false },
        { name: 'address', type: 'text', imp: true, readOnly: false },
        { name: 'emailId', type: 'email', imp: false, readOnly: false },
        { name: 'whatsappNo', type: 'number', imp: true, readOnly: false },
        { name: 'addhar', type: 'file', imp: false, accept: 'image/*', readOnly: false },
        { name: 'pan', type: 'file', imp: false, accept: 'image/*', readOnly: false }
    ]);
    const [field2, setField2] = useState([
        { name: 'date_of_joining', type: 'date', imp: true, readOnly: false },
        { name: 'branch ', type: 'text', imp: false, readOnly: false },
        { name: 'department', type: 'select', options: departments, imp: true, readOnly: false },
        { name: 'designation', type: 'select', options: designations, imp: true, readOnly: false },
        { name: 'reports_to', type: 'select', imp: false, options: ['null'], readOnly: true },
        { name: 'default_shift', type: 'select', options: ["Morning", "Evening", "Night"], imp: true, readOnly: false },
        { name: 'geo-fence', type: 'text', imp: false, readOnly: false },
        { name: 'status', type: 'text', imp: false, readOnly: false },
        { name: 'profile_picture', type: 'file', imp: false, accept: 'image/*', readOnly: false }
    ]);
    const [field3, setField3] = useState([
        { name: 'salary_structure', type: 'text', imp: true, readOnly: false },
        { name: 'salary_mode', type: 'text', imp: true, readOnly: false },
        { name: 'branch_name', type: 'text', imp: true, readOnly: false },
        { name: 'account_no', type: 'text', imp: true, readOnly: false },
        { name: 'IFSC_code', type: 'text', imp: true, readOnly: false },
        { name: 'IMCR_code', type: 'number', imp: true, readOnly: false },
        { name: 'PF_UAN', type: 'text', imp: true, readOnly: false },
        { name: 'ESIC_NO', type: 'text', imp: true, readOnly: false },
        { name: 'PF_ACCOUNT_no', type: 'number', imp: true, readOnly: false }
    ]);
    const allFields = [field1, field2, field3]
    const [fields, setFields] = useState(allFields[0])

    const allFormData = [
        { formData: formData1, setFormData: setFormData1 },
        { formData: formData2, setFormData: setFormData2 },
        { formData: formData3, setFormData: setFormData3 }
    ]
    const [tableData, setTableData] = useState({})

    const submitApi = ["register", "joining", "salary"]

    function resetForm() {
        setFormData3({
            salary_structure: "",
            salary_mode: "",
            branch_name: "",
            account_no: "",
            IFSC_code: "",
            IMCR_code: "",
            PF_UAN: "",
            ESIC_NO: "",
            PF_ACCOUNT_no: "",
            empId: ""
        })
        setFormData2({
            date_of_joining: "",
            branch: "",
            department: "",
            designation: "",
            default_shift: "",
            reports_to: "",
            geo_fence: "",
            status: "",
            profile_picture: null,
            empId: ""
        })
        setFormData1({
            first_Name: "",
            middle_Name: "",
            last_Name: "",
            date_of_birth: "",
            gender: "",
            postal_Code: "",
            address: "",
            emailId: "",
            whatsappNo: "",
            addhar: null,
            pan: null
        })
        let updatedField = readOnlyFalse(field1)
        setField1(updatedField)

        updatedField = readOnlyFalse(field2)
        setField2(updatedField)

        updatedField = readOnlyFalse(field3)
        setField3(updatedField)
    }
    const onSubmit = async (api) => {
        const empId = localStorage.getItem("empId")
        const doj = localStorage.getItem("doj")
        let data = null;
        console.log(formData1);

        switch (api) {
            case "joining":
                if (!empId) {
                    toast.warn("Emp Id not found.", toasterObj);
                    return;
                }

                if (!formData2['department'] || !formData2['designation'] || !formData2['default_shift']) {
                    toast.warn("Some field is missing", toasterObj);
                    return;
                }
                data = { ...formData2, empId }
                console.log(data);
                break;
            case "salary":
                if (!doj) {
                    toast.warn("Fill up joining form.", toasterObj);
                    return;
                }
                data = { ...formData3, empId }
                console.log(data);
                break;
            default:
                if (!formData1['gender'] || formData1['gender'] === "") {
                    toast.error("Gender is required", toasterObj);
                    return;
                }
                if (formData1['postal_Code'].length !== 6) {
                    toast.warn("Invalid postal code..", toasterObj);
                    return;
                }
                if (formData1['whatsappNo'].length !== 10) {
                    toast.warn("Invalid whatsapp number..", toasterObj);
                    return;
                }
                if (/\d/.test(formData1['address'])) {
                    toast.warn("Invalid adress..", toasterObj);
                    return;
                }
                data = formData1
                console.log(data);
                break;
        }

        setDisabledBtn(true);
        axios.post(`https://employeebackend-ikfc.onrender.com/api/employee/${api}`, data, {
            headers: {
                'Content-Type': api === "salary" ? "application/json" : 'multipart/form-data'
            }
        })
            .then((response) => {
                const responseData = response.data;
                console.log(responseData);
                setDisabledBtn(false);
                if (!responseData.success) {
                    toast.error(responseData.message, toasterObj);
                    return;
                }

                if (api === "register") {
                    setTableData(responseData.data)
                    const updatedField = readOnlyTrue(field1);
                    setField1(updatedField);
                    localStorage.setItem("empId", responseData.data.empId);
                    setEmpId(responseData.data.empId)
                    activeHandeler(1)
                }
                else if (api === "joining") {
                    setTableData(prev => ({ ...prev, ...responseData.data }))
                    const updatedField = readOnlyTrue(field2);
                    setField2(updatedField);
                    localStorage.setItem("doj", responseData.data.date_of_joining);
                    activeHandeler(2)
                    console.log(tableData);
                }
                else {
                    pushNewData(tableData);
                    localStorage.removeItem("empId");
                    localStorage.removeItem("date_of_joining");
                    setEmpId(null)
                    resetForm()
                    activeHandeler(0)

                }
                toast.success(responseData.message, toasterObj);
            }).catch(err => { console.log(err); toast.error("Internal server error.", toasterObj); })
    }

    useEffect(() => {
        const empId = localStorage.getItem("empId")
        if (empId) {
            setEmpId(empId)
            axios.get(`/api/employee/getOverview?empId=${empId}`)
                .then(responce => {
                    if (!responce.data.success) {
                        toast.error(responce.data.message, toasterObj);
                        return;
                    }
                    setField1(prev => prev.map(item => ({ ...item, readOnly: true })))
                    console.log(field1);
                    const x = responce.data.data
                    console.log(x);
                    setFormData1(null)
                    setFormData1(x)
                    setTableData(responce.data.data)
                }).catch(err => { console.log(err); })
        }
    }, [])

    useEffect(() => {
        const doj = localStorage.getItem("doj")
        const empId = localStorage.getItem("empId")
        if (doj) {
            axios.get(`/api/employee/getJoinning?empId=${empId}`).then(responce => {
                if (!responce.data.success) {
                    toast.error(responseData.message, toasterObj);
                    return;
                }
                setField2(prev => prev.map(item => ({ ...item, readOnly: true })))
                const x = responce.data.data
                setFormData2(null)
                setFormData2(x)

                setTableData(prev => ({ ...prev, ...responce.data.data }))
            }).catch(err => { console.log(err); })
        }
    }, [])

    return (
        <>
            <div className=" absolute top-0 left-0 w-full h-full rounded-lg flex items-center justify-center px-2 bg-[#7474740c] z-50" style={{ display: visibility }}>
                <div className="w-[99.1%] h-full rounded-lg backdrop-blur-[2px] flex items-center justify-center bg-[#3f3f3f3f] py-2">
                    <div action="" className='z-0 relative min-w-[450px] w-1/2 h-full rounded-lg bg-zinc-900 text-white flex flex-col overflow-hidden'>
                        <header className='pt-4 pl-12 flex gap-1'>
                            <div className='absolute right-0 top-0 p-1 text-2xl cursor-pointer' onClick={() => { setVisibility('none') }}>
                                <IoIosCloseCircleOutline />
                            </div>

                            {
                                fieldButton.map((item, index) => {
                                    return <button type='button' key={item} className={`${active[index] && 'bg-zinc-700'} border-2 border-zinc-700 capitalize px-3 py-1 rounded-md rounded-b-none border-b-0 fieldButtonActive`} onClick={() => {
                                        activeHandeler(index)
                                    }}>{item}</button>
                                })
                            }
                        </header>

                        <div className={`w-full h-full bg-zinc-700`}>
                            <form className=" whitespace-nowrap h-full" onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit(submitApi[i])
                            }} encType="multipart/form-data">
                                <span className='text-red-600 px-4'>{empId && empId}</span>
                                <div className={`w-full p-4 grid-cols-2 grid gap-y-3 gap-x-5 pb-16`} >
                                    {
                                        fields.map((items) => (
                                            <InputField params={items} key={items.name} state={{ arr: allFormData, index: i }} />
                                        ))
                                    }
                                </div>
                                <footer className="absolute bottom-0 left-0 w-full bg-zinc-900 flex items-center justify-between py-2 px-2 text-blue-600">
                                    <h2 className='font-mono text-xl'>Add new employee</h2>
                                    <div className="flex gap-2">
                                        <button type='reset' className={`rounded-md border-2 border-blue-600 px-3 py-1 ${(allFields[i][0].readOnly || disabledBtn) && " cursor-not-allowed "}`} disabled={(allFields[i][0].readOnly || disabledBtn)}>Reset</button>
                                        <button type='submit' className={`rounded-md text-zinc-900 font-semibold bg-blue-600 px-3 py-1 ${(allFields[i][0].readOnly || disabledBtn) ? " cursor-not-allowed " : ""}`} disabled={(allFields[i][0].readOnly || disabledBtn)}>Submit</button>
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
