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

function App() {

  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<><Hero /></>} />
            <Route path='/login' element={<><Login /></>} />
            <Route path='/register' element={<><Register /></>} />
            <Route path='/create' element={<><CreatePost /></>} />
            <Route path='/post/:id' element={<><PostPage /></>} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
