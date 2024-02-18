import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Hero from './pages/Hero'
import { UserContextProvider } from './components/UserContext'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/PostPage'
import { Toaster } from 'sonner'
import MyAccount from './pages/MyAccount'
import AllPosts from './pages/AllPosts'
import EditPost from './pages/EditPost'
import EmailVerify from './pages/EmailVerify'

function App() {

  return (
    <div className='font-sans'>
      <Toaster
        position='top-center'
        reverseOrder={false}

      />
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<><Hero /></>} />
            <Route path='/login' element={<><Login /></>} />
            <Route path='/register' element={<><Register /></>} />
            <Route path='/create' element={<><CreatePost /></>} />
            <Route path='/post/:id' element={<><PostPage /></>} />
            <Route path='/my-account' element={<><MyAccount /></>} />
            <Route path='/all-posts' element={<><AllPosts /></>} />
            <Route path='/edit-post/:id' element={<><EditPost /></>} />
            <Route path='/users/:id/verify/:token' element={<><EmailVerify /></>} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
