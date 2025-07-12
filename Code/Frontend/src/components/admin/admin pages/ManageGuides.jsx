import { useEffect, useState } from "react"
import apiServices from "../../Services/apiServices"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { HashLoader } from "react-spinners"
import Switch from "react-switch"
import Swal from "sweetalert2"
import ViewGuides from "./ViewGuides"
import Modal from 'react-modal'




export default function ManageGuides(){
    const [guides,setGuides]=useState([])
    const [load,setLoad]= useState(true)
    const [selectedId, setSelectedId]=useState(null)


    const customStyles = {
        content: {
          height:'700px',
          width:'600px',
          margin:'auto auto',
          backgroundColor:'transparent',
          borderRadius:"20px",
          border:"none",
        },
      };
    var [isOpen,setIsOpen]=useState(false)


    useEffect(()=>{
        fetchGuides()
    },[])

    const fetchGuides=()=>{
        apiServices.allGuides()
        .then((res)=>{          
            if(res.data.success){
                // toast.success(res.data.message)
                setGuides(res.data.guideData)    
                setInterval(()=>{
                    setLoad(false)
                },2000)
            }else{
                toast.error(res.data.message)
            }
        })  
        .catch((err)=>{
            toast.error(err.message)
        })  
    }

     const changeGuideStatus = (id,status)=>{
            let formData = {
                _id:id,
                status:!status
            }
    
            apiServices.guideChangeStatus(formData)
            .then((res)=>{
                if(res.data.success){
                     Swal.fire({
                                        title:`${status?"Account will be disabled":"Account will be activated"}!`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "blue",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, Go Ahead!!"
                                      })
                                      .then((result) => {
                                        if (result.isConfirmed) {
                                            toast.success(res.data.message)
                                            fetchGuides()
                                          Swal.fire({
                                            title: "Success !",
                                            text: `${status?"Account temporarily disabled":"Account has been activated"}!`,
                                            icon: "success"
                                          });
                                        }
                                      });
                    
                }
                else{
                    toast.error(res.data.message)
                }
            })
            .catch((err)=>{
                toast.error(err.message)
            })
        }


    return(
        <>
           

<div className="container-fluid mt-4 pb-4">
                {load?<HashLoader color="blue" style={{display:"block", margin:"auto"}}/>:
                
            <div className="container mt-5">
                <h2 className="mb-5 fs-1 text-center text-light fw-bold">Guides Management</h2>
                <div className="table-responsive">
                    <table className="reportTable table table-hover table-striped">

                        <thead className="table-dark text-center">
                            <tr>
                                    <th>Sr.No</th>
                                    <th>Profile Pic</th>
                                    <th>Guide</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody className="text-center">
                        {guides.map((guide,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    {guide.guideImage?
                                    <img src={guide?.guideImage} alt="" height="50px" width="50px" className="rounded-circle border border-dark" />
                                    :
                                    <i class="bi bi-person-circle fs-1"></i>
                                    }
                                </td>
                                <td>{guide?.userId?.name}</td>
                                <td>{guide?.userId?.email}</td>
                                <td>
                                    {guide?.status?
                                    <span className="badge bg-success badge-status">Active</span>
                                    :
                                    <span className="badge bg-danger badge-status">In-Active</span> 
                                }
                                    
                                </td>
                                <td>
                                    <button className="btn btn-primary mx-1" onClick={()=>{setIsOpen(true); setSelectedId(guide._id) } }>
                                                <i className="bi bi-eye"/>
                                    </button>

                                    
                                    <Switch
                                        checked={guide?.status}
                                        onChange={()=>(changeGuideStatus(guide?.userId?._id, guide?.status))}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        handleDiameter={30}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                        height={20}
                                        width={48}
                                        className="react-switch align-self-center ms-md-1"
                                        id="material-switch"
                                    />

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

                }

                <Modal isOpen={isOpen} ariaHideApp={false} bodyOpenClassName="modal-open"  style={{...customStyles,overlay: {zIndex: 2000}}}>
                                    <ViewGuides setIsOpen={setIsOpen} selectedId={selectedId}/>
                </Modal>
            
            </div>
        </>
    )
}