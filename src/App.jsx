import { useState } from 'react'
import './App.css'
import Login from './component/Login'
import ChangePassword from './component/ChangePassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Login/>
      {/*<ChangePassword/>*/}
    </>
  )
}

export default App
