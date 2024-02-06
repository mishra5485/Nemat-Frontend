import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'



export const PrivateRoute = ({children }) => {




   let {user} = useSelector((store) => store.profile)


  //  const Navigate = useNavigate()
   
    // console.log(user.SkipChangeDefaultPasswordPage)

     if (user === null) {
      console.log("done")
    return <Navigate to="/" />;
  }

  return children;
}

