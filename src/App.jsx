import { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { userLogIn , userLogOut } from './slices/userSlices'
import auth from "./auth/auth"
import {Header,Footer} from "./components/index"
import { Outlet } from 'react-router-dom'
import {PostCard} from "./components/index"

function App() {
  let dispatch = useDispatch()
  let [loading,setLoading] = useState(true);

  useEffect(()=>{
    auth.getCurrentUser()
    .then((userData)=> {
      if (userData){
        dispatch(userLogIn(userData));
      } else {
        dispatch(userLogOut())
      }
    })
    .catch((error) => {
      console.log('ERROR AT START' , error);
    })
    .finally(() => setLoading(false))
  },[])

  if (loading) {
    return (
      <div>
        Loading ...
      </div>
    )
  } else {
    return(
      <>
       <Header/>
       <Outlet/>
       <Footer/>
      </>
    )
  }

  
}

export default App
