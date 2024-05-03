import React from 'react'
import Navbar2 from './Navbar2'
import { Link } from 'react-router-dom'
function Home() {
    const img = ['img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg']
    const text = ['Employee', 'Geo-Fence', 'Leave', 'Time & Attendence', 'Roles & Permission', 'Reports']
    const links = [  '/employee', '/','/', '/time-attendance/', '/', '/', '/'];
    return (
        <>
            <Navbar2 to={['/']} name={['All applications']} />
            <div className='flex flex-wrap h-full w-full p-8 gap-5 pt-2 dark:text-zinc-200'>
                {img.map((item, index) =>
                (
                    <Link to={links[index]} key={item} className=" w-60 h-60 rounded-xl dark:bg-zinc-900 overflow-hidden relative cursor-pointer">
                        <img src={`images/${item}`} id={item} className='w-full h-full object-cover z-0' alt="" />
                        <label htmlFor={item} className='img-label text-xl z-10 text-center capitalize absolute bottom-0 w-full h-3/4 flex items-end justify-center bg-gradient-to-b  from-transparent to-zinc-900 p-2 tracking-tight'>{text[index]}</label>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Home