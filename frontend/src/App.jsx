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

function App() {

  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/login' element={<><Login /></>} />
            <Route path='/register' element={<><Register /></>} />
            <Route path='/' element={<><Hero /></>} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
