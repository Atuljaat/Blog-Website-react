import React from 'react'

function Logo({
    width = "100px",
    className
}) {
  return (
    <div className={`${width} ${className} `} >Logo</div>
  )
}

export default Logo