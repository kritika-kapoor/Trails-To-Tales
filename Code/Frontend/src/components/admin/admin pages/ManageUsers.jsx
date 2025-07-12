import { useEffect, useState } from "react"
import apiServices from "../../Services/apiServices"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import {HashLoader} from "react-spinners"
import Switch from "react-switch"
import Swal from "sweetalert2"
import ViewUsers from "./ViewUsers"
import Modal from 'react-modal'

export default function ManageUsers(){
    const [users,setUsers]=useState([])
    const [load,setLoad] = useState(true)
    const [selectedId, setSelectedId]=useState(null)
    
    const customStyles = {
        content: {
          height:'600px',
          width:'600px',
          margin:'auto auto',
          backgroundColor:'transparent',
          borderRadius:"20px",
          border:"none"
        },
      };
      var [isOpen,setIsOpen]=useState(false)


    useEffect(()=>{
        fetchUsers()
    },[])

    const fetchUsers=()=>{
        apiServices.allUsers()
        .then((res)=>{  
            
            if(res.data.success){
                // toast.success(res.data.message)
                setUsers(res.data.userData)                    
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

    const changeUserStatus = (id,status)=>{
        let formData = {
            _id:id,
            status:!status
        }

        apiServices.userChangeStatus(formData)
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
                                        fetchUsers()
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
                        <h2 className="mb-5 fs-1 text-center text-light fw-bold">User Management</h2>
                        <div className="table-responsive">
                            <table className="reportTable table table-striped table-hover">
                                
                                <thead className="table-dark text-center">
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Profile Pic</th>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="text-center table-striped">
                                {users.map((user,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            {!!user.userImage?
                                            <img src={user?.userImage} className="rounded-circle border border-dark" height="50px" width="50px" /> 
                                            :
                                            <i class="bi bi-person-circle fs-1"></i>
                                            }
                                        </td>
                                        <td>{user.userId.name}</td>
                                        <td>{user.userId.email}</td>
                                        <td>
                                            {user.status?
                                            <span className="badge bg-success badge-status">Active</span>
                                            :
                                            <span className="badge bg-danger badge-status">In-Active</span> 
                                        }
                                            
                                        </td>
                                        <td>
                                            <button className="btn btn-primary mx-1" onClick={()=>{setIsOpen(true); setSelectedId(user._id) } }>
                                                <i className="bi bi-eye"/>
                                            </button>

                                            
                                            <Switch
                                                checked={user?.status}
                                                onChange={()=>(changeUserStatus(user?.userId?._id, user?.status))}
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
            
                <Modal isOpen={isOpen} ariaHideApp={false} bodyOpenClassName="modal-open"  style={{...customStyles,overlay: {zIndex: 1000}}}>
                    <ViewUsers setIsOpen={setIsOpen} selectedId={selectedId}/>
                </Modal>

            </div>
        </>
    )
}