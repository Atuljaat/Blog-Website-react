import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider , createBrowserRouter , createRoutesFromElements , Route } from 'react-router-dom'
// import {SignUp , Login , Home, PostForm} from "./components/index.js"
import {Home,AddPost,AllPost,Login,SignUp,FullPost,EditPost} from './components/pages/index.js'
import { PostForm } from './components/index.js'



const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App/>}>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/add-post' element={<AddPost/>}  />
      <Route path='/all-posts' element={<AllPost/>}  />
      <Route path='post/:slug' element={<FullPost/>} />
      <Route path='post/edit/:slug' element={<EditPost/>} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={route}>
    <App/>
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
