import './App.css'
import Login from './component/Login'
import ChangePassword from './component/ChangePassword'
import CompanyDetails from './regestation/CompanyDetails'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Error from './pages/Error'
import {PrivateRoute }from './component/auth/PrivateRoute'
import RequestSent from './regestation/RequestSent'
import PasswordUpdated from './component/passwordUpdated'
import Cart from './component/Cart'
import ForgotPassword from './component/ForgotPassword'


function App() {

  return (
    <>

      <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/login' element={<Login/>} />
        <Route  path='/forgot' element={<ForgotPassword/>}/>
        <Route  path='/companydetails' element={<CompanyDetails/>} />
        <Route  path='/cart' element={<Cart/>} />
        
        <Route  path='/changepassword' element={
          <PrivateRoute>
            <ChangePassword/>
          </PrivateRoute>  
          } 
        />  

        <Route  path='/passwordUpdated' element={
          <PrivateRoute>
            <PasswordUpdated/>
          </PrivateRoute>  
          } 
        />
        
        

         <Route  path='/companydetails/requestsent' element={
          <PrivateRoute>
              <RequestSent/>
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
