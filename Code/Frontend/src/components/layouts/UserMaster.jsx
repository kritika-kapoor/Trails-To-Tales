import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BannerNav from "./BannerNav";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function UserMaster(){
    let isLogin = sessionStorage.getItem("isLogin")
    let userType = sessionStorage.getItem("userType")
    useEffect(()=>{
        if(!isLogin || userType!=2){
        toast.error("NO ACCESS !!")
        return(<Navigate to={'/'}/>)
    }
    }, [isLogin, userType])
    
    return(
        <>
            <BannerNav/>
            <Outlet/>
            <Footer/>
        </>
    )
    
}