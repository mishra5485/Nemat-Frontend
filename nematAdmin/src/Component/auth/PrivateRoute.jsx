import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



export const PrivateRoute = ({children }) => {

  const { user } = useSelector((store) => store.profile);
  // console.log(user)

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
