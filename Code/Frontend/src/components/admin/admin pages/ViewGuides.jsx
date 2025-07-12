import { useParams } from "react-router-dom"
import apiServices from "../../Services/apiServices"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { HashLoader } from "react-spinners"

export default function ViewGuides({setIsOpen,selectedId}){
    const [guideData, setGuideData] = useState({})
    const [load,setLoad]= useState(true)

    useEffect(()=>{
        fetchSingleGuide()
    },[selectedId])

    const fetchSingleGuide=()=>{
        let formData = {
            _id:selectedId
        }
        apiServices.getGuide(formData)
        .then((res)=>{            
            if(res.data.success){
                console.log(res);
                
                toast.success(res.data.message)
                console.log(res);
                
                setGuideData(res.data.guideData)  
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
            <div className="profile-container">
            <div className="profile-card pt-2 d-flex flex-column">
                <button className="btn btn-danger btn-close align-self-end mb-4 mt-1" onClick={()=>{setIsOpen(false)}}></button>
                <div className="profile-header">
                <div className="profile-pic-wrapper">
                    <div className="profile-pic">
                    {guideData?.guideImage ? (
                        <img src={guideData?.guideImage} alt="Profile" />
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
                        <input disabled className="form-control border border-none" placeholder={guideData?.userId?.name} style={{border:"none"}}/>
                    </div>   

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <i class="bi bi-envelope"></i>
                        </span>
                        <input disabled className="form-control border border-none" placeholder={guideData?.userId?.email} style={{border:"none"}}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <i class="bi bi-telephone"></i>
                        </span>
                        <input disabled className="form-control border border-none" placeholder={guideData?.phoneNumber} style={{border:"none"}}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            <i class="bi bi-geo-alt"></i>
                        </span>
                        <input disabled className="form-control border border-none" placeholder={guideData?.destinationId?.destinationName} style={{border:"none"}}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text px-3" id="basic-addon1">
                            $
                        </span>
                        <input disabled className="form-control border border-none" placeholder={guideData?.amountPerDay} style={{border:"none"}}/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text text-warning" id="basic-addon1">
                            <i class="bi bi-star-fill"></i>
                        </span>
                        <input disabled className="form-control border border-none" placeholder={guideData?.rating} style={{border:"none"}}/>
                    </div>


                </div>
            </div>
            </div>
            }       
        </>
    )
}