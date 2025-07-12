import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify"
import apiServices from "../../Services/apiServices";
import "./Login.css"

export default function Login(){
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const nav = useNavigate()

    const submitForm=(e)=>{
        e.preventDefault();

        let formData = {
            email:email,
            password:pass
        }
        
        apiServices.login(formData)
        .then((res)=>{
            console.log(res);
            
            if(res.data?.success){
               console.log(res);
               
                toast.success(res.data?.message)
                sessionStorage.setItem("Id", res?.data?.commonData?._id)
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("name" , res.data.commonData.name)
                sessionStorage.setItem("userType" , res?.data?.commonData?.userType)
                sessionStorage.setItem("isLogin" , true)
                sessionStorage.setItem("profilePic" , res?.data?.userData?.userImage)
                sessionStorage.setItem("guideProfilePic" , res?.data?.guideData?.userImage)


                if(res.data?.commonData?.userType==1){
                    nav("/admin")
                }
                else if(res.data?.commonData?.userType==2){
                    nav("/user")
                }
                else{
                    nav("/guide")
                }
            }
            else{
                toast.error(res.data?.message)
            }
        })
        .catch((err)=>{
            toast.error(err?.message)
        })
    }

    return(
        <div className="login-wrapper d-flex justify-content-center align-items-center">
        <div className="login-card shadow-lg p-5">
          <h2 className="mb-4 text-center fw-bold">Trails to Tales</h2>
          <p className="text-center text mb-4">Join the travel community</p>
  
          <div className="form-group mb-3">
            <input
              type="email"
              className="text-secondary form-control rounded-pill px-4 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          <div className=" form-group mb-3">
            <input
              type="password"
              className="text-secondary form-control rounded-pill px-4 py-2"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
  
          <button
            onClick={submitForm}
            className="btn btn-primary w-100 rounded-pill py-2 mb-3 fw-semibold shadow"
          >
            Log in
          </button>
  
          <div className="text-center">
            <span className="text-muted">Not a member? </span>
            <a href="#" className="text-decoration-none" onClick={() => nav("/register")}>
              Register now
            </a>
          </div>
        </div>
      </div>
    )
}