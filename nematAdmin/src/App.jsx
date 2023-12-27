
import './App.css'
import Admin_login from './Component/Admin_login'
import { Route, Routes } from 'react-router-dom'
import Error from './Component/Error'
import Dashboard from './Component/Dashboard'
import { PrivateRoute } from './Component/auth/PrivateRoute'
import Check from './Component/Check'

function App() {


  return (
    <>
      <Routes>
          <Route  path='/' element={<Admin_login/>}/>
           <Route path="*" element={<Error />} />  

         
            <Route path='/dashboard' element={<Dashboard/>}> 

                <Route  path='check' element={
                    <PrivateRoute>
                      <Check/>
                    </PrivateRoute>  
                    } 
                  />  
           </Route>
      </Routes>  
    </>
  )
}

export default App
