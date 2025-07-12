import { Outlet } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import GuestHeader from "./GuestHeader";
import GuestFooter from "./GuestFooter";

export default function GuestMaster(){
    return(
        <>
            <GuestHeader/>
            <Outlet/>
            <GuestFooter/>
        </>
        
    )
}