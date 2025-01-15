import React, { act } from 'react'
import { useSelector } from 'react-redux'
import {Logo , Button , Container} from '../index'
import { Link , NavLink , useNavigate } from 'react-router-dom'
import {LogoutButton} from "../index"

function Header() {
  let status = useSelector((state) => state.status)
  let navigate = useNavigate()
  let navItems = [
    {
      name : "Home",
      path :"/",
      active : true
    },
    {
      name : "All Posts",
      path : "/all-posts",
      active : status
    },
    {
      name : "Add Post",
      path:"/add-post",
      active : status
    },
    {
      name : "Login",
      path:"/login",
      active : !status
    } ,
    {
      name : "Sign-up",
      path:"/signup",
      active : !status
    } ,
  ]
  return (
  <header className='py-3 shadow bg-gray-500'>
    <Container>
        <div>
          <nav className='flex items-center'>
            <div>
              <Link to="/">
                <Logo width='80px' className='font-semibold'/>
              </Link>
            </div>
            <ul className='flex ml-auto'>
              {
                navItems.map((items) => {
                 return items.active ? (
                  <li key={items.name} >
                      <button onClick={() => navigate(items.path) }
                      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                        {items.name}
                      </button>
                  </li>
                 ) : null
                })
              }
              {
                status && <LogoutButton/>
              }
            </ul>
          </nav>
        </div>
    </Container>
  </header>
  )
}

export default Header