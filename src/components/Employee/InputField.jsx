import React from 'react';

function InputField({ params, state }) {
    const { name, type, imp, accept, readOnly } = params;
    const { arr, index } = state
    const { formData, setFormData } = arr[index]
    const change = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value
        }));
    }
    return (
        <div className="rounded-md border-2 relative border-blue-500 w-full flex py-2 text-base ">
            <label htmlFor={name} className="leading-none absolute top-[-3%] -translate-x-1/2 left-1/2 -translate-y-1/2 px-3 text-xs bg-zinc-700 capitalize">{name.replace(/_/g, ' ')} {imp && <span className='text-red-600 text-sm leading-none'>*</span>}</label>
            {(type !== 'select' && type !== 'file') && <input
                className={`rounded-md w-full h-full p-2 outline-none bg-transparent font-thin `}
                type={type}
                name={name}
                id={name}
                required={imp}
                inputMode={type === 'number' ? 'number' : 'text'}
                
                onChange={change}
                readOnly={readOnly}
                value={formData[name] ? formData[name] : ""}
            />}
            {type === 'file' &&
                <>
                    <input
                        className='rounded-md w-full h-full p-2 outline-none bg-transparent font-thin opacity-0'
                        type={type}
                        name={name}
                        id={name}
                        accept={`${accept && accept}`}
                        onChange={change}
                        required={imp} disabled={readOnly} />
                    <p htmlFor="" className=' absolute top-1/2 -translate-y-1/2 px-2 whitespace-nowrap overflow-hidden text-ellipsis w-full text'>{formData[name]?.name}</p>
                    <label htmlFor={name} className=' absolute rounded-full text-xs  bg-zinc-600 px-2 top-4 -translate-y-1/2 right-0'>Choose File</label>
                </>
            }
            {type === 'select' &&
                <select
                    name={name}
                    id={name}
                    className={`w-full bg-transparent rounded-md text-base px-3 py-1 flex items-center gap-1 outline-none capitalize font-thin`}
                    required={imp}
                    onChange={change}
                    disabled={readOnly}
                    value={formData[name]}
                >

                    <option className='bg-zinc-600 capitalize' value={null} >--Select--</option>

                    {params.options.map((item) => (
                        <option className='bg-zinc-600 capitalize' value={item} key={item}>{item}</option>
                    ))}

                </select>
            }
        </div>
    );
}

export default InputField;
