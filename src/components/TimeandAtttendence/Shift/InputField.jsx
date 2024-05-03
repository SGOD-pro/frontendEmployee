import React from 'react';

function InputField({ params, state }) {
    const { name, type, imp, field, options, placeHolder } = params;
    const { formData, setFormData } = state
    const change = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <div className="rounded-md border-2 relative border-blue-500 w-full flex py-2 text-base">
            <label htmlFor={name} className="leading-none absolute top-[-3%] -translate-x-1/2 left-1/2 -translate-y-1/2 px-3 text-xs bg-zinc-700 capitalize">{field} {imp && <span className='text-red-600 text-sm leading-none'>*</span>}</label>
            {placeHolder!==""&& <label htmlFor={name} className=' bg-zinc-800 pointer-events-none rounded-lg absolute right-0 px-2 top-1/2 -translate-y-1/2 opacity-45'>{placeHolder}</label> }
            {(type !== 'select' && name !== "TSD" && type!=='checkbox') && <input
                className={`rounded-md w-full h-full p-2 outline-none bg-transparent font-thin `}
                type={type}
                name={name}
                id={name}
                required={imp}
                inputMode={type === 'number' ? 'number' : 'text'}
                onChange={change}
                value={formData[name] ? formData[name] : ""}
            />}
            {
                (name === "TSD") && <label
                    className={`rounded-md w-full h-full p-2 outline-none bg-transparent font-thin min-h-10`}
                    name={name}
                    id={name}
                ></label>
            }
            {type === 'select' &&
                <select
                    name={name}
                    id={name}
                    className={`w-full bg-transparent rounded-md text-base px-3 py-1 flex items-center gap-1 outline-none capitalize font-thin`}
                    required={imp}
                    onChange={change}
                    value={formData[name]}>

                    <option className='bg-zinc-600 capitalize' value={null} >--Select--</option>

                    {options.map((item) => (
                        <option className='bg-zinc-600 capitalize' value={item} key={item}>{item}</option>
                    ))}
                </select>
            }
        </div>
    );
}

export default InputField;
