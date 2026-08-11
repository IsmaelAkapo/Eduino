import './App.css'
import './components/CRootCss.css'

import PIndex from './pages/index/PIndex'
import PAccesoNene from './pages/accesoNene/PAccesoNene'
import PAccesoTutor from './pages/accesoTutor/PAccesoTutor'
import PManagerTutor from './pages/managerTutor/PManagerTutor'
import PIndexNene from './pages/indexNene/PIndexNene'

import {Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<PIndex/>} />
      <Route path='/accesoNene' element={<PAccesoNene/>}/>
      <Route path='/accesoTutor' element={<PAccesoTutor/>}/>
      <Route path='/manager' element={<PManagerTutor/>}/>
      <Route path='/indexNene' element={<PIndexNene/>}/>
    </Routes>
  )
}

export default App
