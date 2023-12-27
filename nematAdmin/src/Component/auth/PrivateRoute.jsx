import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



export const PrivateRoute = ({children }) => {




   let {user} = useSelector((store) => store.profile)

     if (user === null) {
      console.log("done")
    return <Navigate to="/" />;
  }

  return children;
}