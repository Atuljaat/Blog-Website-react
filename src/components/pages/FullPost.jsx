import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import database from '../../auth/database'
import parse from "html-react-parser"
import { Button } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Pages() {
  const [data, setData] = useState([])
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [userID, setUserID] = useState(useSelector((state) => state.userData.$id))
  const navigate = useNavigate()

  useEffect(() => {
    database.getPost(slug)
      .then((res) => setData(res))
      .then(() => setLoading(false))
  }, [])

  const removePost = async () => {
    try {
      const file = await database.deleteFile(data.featuredImage)
    if (file){
    const removing = await database.deletePost(slug);
    console.log("Post deleted Successfully")
    navigate("/all-posts")
   }
    } catch (error) {
      throw error
    }
  }

  const editPost = () => {
    navigate(`/post/edit/${slug}`)
  }

  console.log(data)
  if (!loading) {
    return (
      <>
        <div className='flex justify-center flex-col items-center bg-slate-400'>
          <div><img className='w-full mt-5' src={(database.getFilePreview(data.featuredImage)).href} alt="" /></div>
          <div className='my-10 flex flex-col gap-8'>
            <div className=' text-center text-2xl font-semibold'>{data.title}</div>
            <div className=' mx-10'> {parse(data.content)}</div>
          </div>

            {
              (userID==data.userID) ?
              <div className='flex gap-2 justify-end items-end w-full mr-5 mb-5'>
              <Button
                onClick={removePost}
                children="Remove"
              />
              {/* <Button
                onClick={editPost}
                children="Edit"
                classname='bg-green-700 hover:bg-green-400'
              /> */}
            </div> : null
            }
        </div>
      </>
    )
  } else {
    return (
      <div> Loading... </div>
    )
  }
}

export default Pages