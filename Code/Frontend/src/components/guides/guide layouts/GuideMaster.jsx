import { Navigate, Outlet } from "react-router-dom";
import GuideFooter from "./GuideFooter";
import GuideBannerNav from "./GuideBannerNav";
import { toast } from "react-toastify";

export default function GuideMaster(){
    let isLogin = sessionStorage.getItem("isLogin")
    let userType = sessionStorage.getItem("userType")
    if(!isLogin || userType!=3){
        toast.error("NO ACCESS !!")
        return(<Navigate to={'/'}/>)
    }
    else{
    return(
        <>
            <GuideBannerNav/>
            <Outlet/>
            <GuideFooter/>
        </>
    )
    }
}