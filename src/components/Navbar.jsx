import React from 'react';
import { GrAppsRounded } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUserTie } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import {NavLink} from 'react-router-dom'

function Navbar() {
    const title = ['all apps', 'dashboard', 'employee', 'roles & permission', 'time & attendance', 'GEO & fence', 'leave', 'reports'];
    const links=['/', 'none', '/employee', 'none', '/time-attendance/', 'none', 'none', 'none'];
    let icons = [<GrAppsRounded />, <LuLayoutDashboard />, <FaUserTie />, <BsCardChecklist />, <FaBusinessTime />, <CiLocationOn />, <MdOutlineTravelExplore />, <FaChartLine />];
    
    return (
        <nav className="fixed w-24 h-screen bg-blue-900 text-slate-200">
            <ul className="flex flex-col list-none text-4xl items-center leading-[-2rem] pt-4">
                {icons.map((item, index) => (
                    <li key={index} className={`flex flex-col items-center border-b w-3/4 ${links[index]==="none"&&" pointer-events-none"} `}>
                        <NavLink to={links[index]} className={({ isActive }) => `${isActive ? "text-white" : "text-slate-400"} flex flex-col items-center hover:text-slate-300 transition py-3`}
                        >{item}
                            <span className='text-xs leading-tight  capitalize text-center'>{title[index]}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
