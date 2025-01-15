import React from 'react'
import { useId , forwardRef , useRef } from 'react'

const Input = forwardRef(function Input({
    label,
    type="text",
    className,
    ...props
} , ref) {
    const id = useId()
  return (
    <>
        <div>
           { label && <label 
           htmlFor={id}
           className='inline-block mb-1 pl-1' 
           >{label}</label>}

           <input 
           ref={ref} 
           type={type} 
           id={id} 
           className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`} 
           {...props} />
        </div>
    </>
  )
});

export default Input