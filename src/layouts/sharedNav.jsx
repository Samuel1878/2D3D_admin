import { Outlet } from "react-router-dom"
import NavBar from "../pages/navBar";

const SharedNav = () =>{
    return(
        <div className="Container">
        <NavBar/>
        <Outlet/>
        </div>
    )
}
export default SharedNav;