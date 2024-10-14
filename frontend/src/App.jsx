import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/signup',
    element: <Signup />
  },
  {
    path:'/jobs',
    element: <Jobs />
  },
  {
    path:'/browse',
    element: <Browse />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
