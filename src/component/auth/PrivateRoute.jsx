import React from 'react'
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({children }) => {

   // const Navigate = useNavigate()
   
   const {user} = useSelector((store) => store.profile)


     if (user === null) {
      console.log("done")
    return <Navigate to="/" />;
  }

  return children;
}

