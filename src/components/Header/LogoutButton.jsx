import React from 'react'
import { useDispatch } from 'react-redux'
import auth from '../../auth/auth'
import { userLogOut } from '../../slices/userSlices'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    function logout () {
        auth.logoutAccount()
        .then((res) => {
            if (res) {
                dispatch(userLogOut())
                navigate("/");
            }
        } )
        .catch((error) => console.log('LOGOUT BUTTON ERROR ' , error));
    }
  return (
    <button 
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logout} > Logout </button>
  )
}

export default LogoutButton