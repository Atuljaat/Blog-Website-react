import React, { useEffect, useCallback } from 'react'
import { Input, Select, Button, RTE } from '../index'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import database from '../../auth/database'

function PostForm({ post }) {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.userData)
    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues:{
            title : post?.title || "",
            content : post?.content || "",
            slug : post?.$id || "",
            status : post?.status || "active",
            // file : post?.image[0] || null,
        }
    })

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await database.uploadFile(data.image[0]) : null;
            if (file) {
                database.deleteFile(post.featuredImage);
                data.featuredImage = file.$id
                data.userID = userData.$id
                const updateFile = database.updatePost(post.$id,{...data});
                if (updateFile){
                    navigate(`/post/${post.$id}`)
                }
            }

        } else {
            const file = await database.uploadFile(data.image[0])
            if (file) {
                data.userID = userData.$id
                data.featuredImage = file.$id
                const post = await database.createPost(data.slug, { ...data })
                if (post) {
                    console.log('successfully uploaded');
                    navigate("/")
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value) {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        } else {
            return ""
        }
    }, [])

    const watchingTitle = watch("title")

    useEffect(() => {
        setValue("slug", slugTransform(watchingTitle), { shouldValidate: true })
    }, [watchingTitle, slugTransform, setValue])

    // useEffect(()=>{
    //     const subscription = watch((value,{name})=>{
    //         if (name === "title"){
    //             setValue("slug" ,slugTransform(value.title) , {shouldValidate:true} )
    //         }
    //     })
    //     return subscription.unsubscribe()
    // } , [watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2 text-lg">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 text-lg"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image",
                        // { required: true }
                        { required: !post }
                    )}
                />
                {post && (
            <div className="w-full mb-4">
                <img
                    src={database.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 text-lg"
                    {...register("status", { required: true })}
                />
                <Button type="submit"
                 className={`w-full p-3 rounded transition-colors duration-500   ${post ? "bg-green-500 hover:bg-green-300 " : "bg-blue-500 hover:bg-blue-300"} `}
                >
                {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm