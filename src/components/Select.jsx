import React from 'react'
import { useId , forwardRef } from 'react'
const Select = forwardRef(function Select({
    label,
    options,
    className,
    ...props
},ref ) {
    const id = useId() 
  return (
    <>
        {label && <label className='text-lg' htmlFor={id}> </label>}
        <select
        {...props} 
        id={id} 
        ref={ref} 
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
            {
                options?.map((item) => {
                    return (
                        <option key={item} value={item} > {item} </option>
                    )
                })
            }
        </select>
    </>
  )
})


export default Select