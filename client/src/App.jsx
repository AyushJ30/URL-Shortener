import {BrowserRouter, Routes, Route} from 'react-router'

import Signup from './Singup/Signup.jsx';
import Login from './Login/Login.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';  
import Create from './Create/Create.jsx';
import Update from './Update/Update.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/' element={<Dashboard/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/update' element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
