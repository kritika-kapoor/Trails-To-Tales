import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import AdminFooter from "./AdminFooter";
import { toast } from "react-toastify";
export default function AdminMaster(){
    let isLogin = sessionStorage.getItem("isLogin")
    let userType = sessionStorage.getItem("userType")
    const nav = useNavigate()
    if(!isLogin || userType!=1){
        toast.error("NO ACCESS !!")
        return(<Navigate to={'/'}/>)
    }
    else{
    return(
        <div style={{background: "linear-gradient(to top, #0287ac, #0072ff)"}}>
            <AdminNav/>
            <Outlet/>
            <AdminFooter/>
        </div>
    )
    }
}