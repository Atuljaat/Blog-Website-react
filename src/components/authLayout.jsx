import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function authLayout({children,authentication = true}) {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.status)
    const [Loader,setLoader] = useState(true)

    useEffect(()=>{
        if (authentication && authStatus != authentication){
            navigate("/login")
        } else if (!authentication && authStatus == authentication ){
            navigate("/")
        }
        setLoader(false)
    },[authentication,authStatus,navigate])

 return Loader ? <h1> Loading... </h1> : <> {children} </>
}

export default authLayout