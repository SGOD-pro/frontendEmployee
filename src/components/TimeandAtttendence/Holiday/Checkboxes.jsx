import React, { useState } from 'react'
import './check.css'
function Checkboxes({ params, states,filedName }) {
    const { selectedDesignations, setSelectedDesignations } = states
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedDesignations([...selectedDesignations, value]);
        } else {
            setSelectedDesignations(selectedDesignations.filter((designation) => designation !== value));
        }
    };
    return (
        <div className='rounded-md border-2 relative border-blue-500 w-full  p-2 text-base'>
            <label htmlFor="" className="leading-none absolute top-[-0%] -translate-x-1/2 left-1/2 -translate-y-1/2 px-3 text-xs bg-zinc-700 capitalize">{filedName}</label>
            {params.map((item, index) => (
                <div key={`${index}+${item}`} className={`flex items-center gap-3 mt-1`}>
                    <input type="checkbox"
                        value={item}
                        checked={selectedDesignations.includes(item)}
                        onChange={handleCheckboxChange}
                        id={item}
                        className='cbx hidden' />
                    <label htmlFor={item} className="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                    </label>
                    <label htmlFor={item} className={`${selectedDesignations.includes(item) && "line-through"} cursor-pointer`}>{item}</label>

                </div>
            ))}

        </div>
    )
}

export default Checkboxes