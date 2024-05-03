import React from 'react'
import { IoMdClose } from "react-icons/io";
function Alert(props) {
    const { success, msg, close } = props
    return (
        <div className={`p-3 pr-14 rounded-lg border ${success ? " border-green-400 bg-green-400/55" : "border-red-400 bg-red-400/50"} flex items-center gap-3`}>
            <div><span className='absolute text-xs top-1 left-3'>{success ? "Success" : "Error"}</span>
                <h3 className='pt-2 dark:text-white'>{msg}</h3></div>
            <IoMdClose className='text-2xl absolute right-2 cursor-pointer' onClick={close}/>
        </div>
    )
}

export default Alert