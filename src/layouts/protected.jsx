import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../services/auth/authContext";
const ProtectedLayout = ()=>{
   const {userToken} = useContext(AuthContext);
   const token = localStorage.getItem("token");
   if(userToken == null && !token){
    return <Navigate to="/login" replace={true}/>
   }
    return(
        <>
        <Outlet/>
        </>
    )
}
export default ProtectedLayout;