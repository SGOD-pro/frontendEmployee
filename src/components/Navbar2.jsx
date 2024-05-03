import React from 'react'
import { NavLink } from 'react-router-dom'
function Navbar2(props) {
    return (
        <>
            <div className=" w-full rounded-md bg-blue-600 flex justify-center items-center gap-4 mt-2 text-zinc-200 p-1 capitalize">
                {props.name.map((item, index) => (
                    <NavLink key={item} to={props.to[index]} className={({ isActive }) => `${isActive ? "text-white" : "text-slate-400"} hover:text-slate-300 transition font-semibold`}>{item}</NavLink>
                ))}
            </div>
        </>
    )
}

export default Navbar2