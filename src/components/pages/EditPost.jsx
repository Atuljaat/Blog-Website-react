import React, { useEffect, useState } from 'react'
import {PostForm} from '../index'
import { useParams } from 'react-router-dom'
import database from '../../auth/database'

function EditPost() {
    const { slug } = useParams()
    const [data,setData] = useState()
    useEffect(()=>{
      database.getPost(slug)
      .then((res)=>setData(res))
    },[])

    const getinfo = async () => {
        // const data = await database.getPost(slug)
        console.log(data)
    }

    
  return (
    <div>
        <PostForm  post={data} />
        <button onClick={getinfo} className='bg-red-500' >hi</button>
    </div>
  )
}

export default EditPost