import React from 'react'

function Button({
    children,
    classname = "",
    disabled = false,
    bgColor = "bg-blue-700",
    textColor = "text-white",
    ...props
}) {
  return (

    <button
    disabled={disabled}
     className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${classname} `}
     {...props}
     >
        {children}
    </button>
  )
}

export default Button