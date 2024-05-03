import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
function Header() {
    return (
        <>
            <header className=' border-2 rounded-md border-blue-600 w-full flex justify-between items-center p-3 text-white bg-zinc-700'>
                <div className=' w-1/2 h-full flex items-center gap-3'>
                    <input type="input" className='bg-[#10101081] p-3 outline-none border-none rounded-md w-full' placeholder='Search'/>
                    <h1 className="flex cursor-pointer text-3xl items-center gap-1"><span>English</span>(UK)<IoIosArrowDropdown className=''/></h1>
                </div>

                <div className='flex items-center gap-1'>
                    <div className="texts text-right">
                        <h4 className='capitalize text-lg leading-none'>Souvik karmakar</h4>
                        <p className=' text-xs'>ID: <span>1sd3f1s5v1s35d1s3</span></p>
                        <h5 className='uppercase text-sm'>admin</h5>
                    </div>
                    <div className=' w-12 h-12 rounded-full overflow-hidden'>
                        <img src='/images/img1.jpeg' alt="" className='w-full h-full object-cover' />
                    </div>
                    <IoIosArrowDropdown className='text-4xl cursor-pointer'/>
                </div>
            </header>
        </>
    )
}

export default Header