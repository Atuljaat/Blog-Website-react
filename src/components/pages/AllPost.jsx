import React from 'react'
import { PostCard , Container } from '../index'
import { useState, useEffect } from 'react'
import database from "../../auth/database"

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        database.getPosts()
            .then((res) => res.documents)
            .then((res) => setPosts(res))
            .then(() => setLoading(false))
    }, [])

    if (!loading) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    } else {
        return <div> Loading...</div>
    }
}

export default AllPost


