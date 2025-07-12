import apiServices from "../../Services/apiServices"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { HashLoader } from "react-spinners"
import "./AdminViewProfile.css"

export default function ViewUsers({setIsOpen,selectedId}){
    const [userData, setUserData] = useState({})
    const [load,setLoad] = useState(true)

    useEffect(()=>{
        fetchSingleUser()
    },[selectedId])

    const fetchSingleUser=()=>{
        let formData = {
            _id:selectedId
        }        
        
        apiServices.getUser(formData)
        .then((res)=>{            
            if(res.data.success){
                toast.success(res.data.message)
                
                setUserData(res.data.data)
                setTimeout(()=>{
                    setLoad(false)
                },1500)
            }
        })
        .catch((err)=>{
            toast.error(err.message)
        })
    }
    
    return(
        <>
            
            {load?<HashLoader color="blue" style={{display:"block", margin:"auto"}}/>:
            <>
            <div className="profile-container">
            <div className="profile-card pt-2 d-flex flex-column">
                <button className="btn btn-danger btn-close align-self-end mb-4 mt-1 me-0" onClick={()=>{setIsOpen(false)}}></button>
                <div className="profile-header">
                <div className="profile-pic-wrapper">
                    <div className="profile-pic">
                    {userData?.userImage ? (
                        <img src={userData?.userImage} alt="Profile" />
                    ) : (
                        <div className="no-image">No Image</div>
                    )}
                    </div>
                </div>
               
                </div>

                <div className="profile-form read-only">
                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <i class="bi bi-person"></i>
                    </span>
                    <input disabled className="form-control border border-none" placeholder={userData?.userId?.name} style={{border:"none"}}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <i class="bi bi-envelope"></i>
                    </span>
                    <input disabled className="form-control border border-none" placeholder={userData?.userId?.email} style={{border:"none"}}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <i class="bi bi-telephone"></i>
                    </span>
                    <input disabled className="form-control border border-none" placeholder={userData?.phoneNumber} style={{border:"none"}}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                        <i class="bi bi-geo-alt"></i>
                    </span>
                    <input disabled className="form-control border border-none" placeholder={userData?.address} style={{border:"none"}}/>
                </div>

               
                </div>
            </div>
            </div>
            </>
            } 
        </>
    )
}