import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Root from './Pages/Root'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Shop from './Pages/Shop'
import About from './Pages/About'
import Contact from './Pages/Contact'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Root />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/shop',
        element:<Shop />
      },
      {
        path:'/shop/:category',
        element:<Shop />
      },
      {
        path:'/cart',
        element:<Cart />
      },
      {
        path:'/signin',
        element:<SignIn />
      },
      {
        path:'/signup',
        element:<SignUp />
      },
      {
        path:'/product/:id',
        element:<Product />
      },
      {
        path:'/about',
        element:<About />
      },
      {
        path:'/contact',
        element:<Contact />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
