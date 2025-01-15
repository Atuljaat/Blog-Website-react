import React, { useState } from 'react'
import auth from '../auth/auth'
import { useDispatch } from 'react-redux'
import { Input , Button } from './index'
import { useNavigate } from 'react-router-dom'
import { userLogIn } from '../slices/userSlices'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState("")

    const LoginUser = async (data) => {
      setError("")
      try {
        const login = await auth.loginAccount(data)
        console.log("login",login);
        if (login){
          const userData = await auth.getCurrentUser(data)
          dispatch(userLogIn(userData));
          navigate("/")
        }
      } catch (error) {
        setError(error)
        throw error
      }
    } 

  return (
    <form onSubmit={handleSubmit(LoginUser)} >
    {error && <div> ${error} </div> }
    <div>
      <Input 
      type="email"
      label="Email : "
      placeholder = "Enter your Email"
      {...register("email",{
        required : true,
        pattern : {
          value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        }
      })}
      />
      <Input
      type="password"
      label="Password : "
      placeholder="Enter your Password"
      {...register("password",{
        required : true
      })}
      />
      <Button type="submit">
        Login
      </Button>
    </div>
    </form>
  )
}

export default Login