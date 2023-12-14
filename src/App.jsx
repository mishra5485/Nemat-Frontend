import { useState } from 'react'
import './App.css'
import Login from './component/Login'
import ChangePassword from './component/ChangePassword'
import CompanyDetails from './regestation/CompanyDetails'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <CompanyDetails/> */}
       <Login/>
      {/*<ChangePassword/>*/}
    </>
  )
}

export default App
