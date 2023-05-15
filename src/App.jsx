import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import CreatePage from './pages/CreatePage'
import UpdatePage from './pages/UpdatePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/details/:id' element={<DetailsPage />} />
      <Route path='/add' element={<CreatePage />} />
      <Route path='/update/:id' element={<UpdatePage />} />
    </Routes>
  )
}

export default App
