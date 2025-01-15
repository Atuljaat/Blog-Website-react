import React, { useRef, useState } from 'react'
import {Input,Button} from "./index"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import auth from "../auth/auth"
import { userLogIn } from '../slices/userSlices'

function SignUp() {
  const {register,handleSubmit} = useForm()
  const [errors,setErrors] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const email = useRef()
  const password = useRef()

  const createAccount = async (data) => {
    setErrors("")
    try {
        const createdUser = await auth.createAccount(data)
        if (createdUser){
            const userData = await auth.getCurrentUser()
            dispatch(userLogIn(userData))
            navigate("/")
        }
    } catch (error) {
        setErrors(error)
        console.log(error)
    }
  }
  
   const JustNavigate = async  () => {
    let user = await auth.getCurrentUser()
    console.log(user)
    navigate("/")
  }

  return (
    <div>
        { errors && <div> {errors} </div> }
        <form onSubmit={handleSubmit(createAccount)} >
        <Input
        label="Name : "
        placeholder="Enter your name"
        {...register("name",{
            minLength : 3,
            required : true
        })}
        />
        <Input
        label="Email : "
        type="email"
        placeholder = "Enter your email"
        {...register("email",{
            required : true,
            validate : {
                matchPatern : (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                || "Email address must be Valid"
            },
            pattern :{
                value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                // message : "Enter a valid Email Address"
            }
        })}
        />
        <Input
        label="Password : "
        type='password'
        placeholder='password must be 8-10 characters'
        {...register("password",{
            required : true,
            minLength : {
                value : 8,
                message:"Password must be at least 8 characters long"
            }
        })}
        />
        <div>
            <Button
            type="submit"
            > Sign up </Button>
        </div>
        </form>
        <button onClick={JustNavigate}>
            home
        </button>
    </div>
  )
}

export default SignUp