import { useState } from 'react'
import './App.css'
import Login from './component/Login'
import ChangePassword from './component/ChangePassword'
import CompanyDetails from './regestation/CompanyDetails'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Error from './pages/Error'
import {PrivateRoute }from './component/auth/PrivateRoute'


function App() {

  return (
    <>

      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/login' element={<Login/>} />
        <Route  path='/companydetails' element={<CompanyDetails/>} />
        
        <Route  path='/login/changepassword' element={
          <PrivateRoute>
            <ChangePassword/>
          </PrivateRoute>  
          } 
        />


          {/* Error Router  */}
          <Route path="*" element={<Error />} />  
      </Routes>
    </>
  )
}

export default App
