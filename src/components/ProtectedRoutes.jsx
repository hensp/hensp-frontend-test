import { Navigate,Outlet } from "react-router-dom"
import storage from "../storage/storage"

export const ProtectedRoutes = () => {
  const authUser = storage.get('authUser');
  if(!authUser){
    return<Navigate to='/login'/>
  }
  return <Outlet/>
}

export default ProtectedRoutes