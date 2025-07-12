import { useEffect, useState } from "react"
import apiServices from "../../Services/apiServices"
import { toast } from "react-toastify"
import { HashLoader } from "react-spinners"
import Swal from "sweetalert2"

export default function ManageAds(){
  const [ads,setAds] = useState([])
  const [load,setLoad] = useState(true)

  
  useEffect(()=>{
        fetchAds()
    },[])

  const fetchAds=()=>{
    apiServices.allAds()
    .then((res)=>{
      if(res.data.success){
        // toast.success(res.data.message)
        console.log(res.data.adsData[0]._id);
        
        setAds(res.data.adsData)
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

  const approve=(id)=>{
      let formData={
        _id:id,
        status:1
      }
      console.log(id);
      

      apiServices.adsChangeStatus(formData)
      .then((res)=>{
          if(res.data.success){
            Swal.fire({
                title:"Are you sure you want to approve this ad ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "blue",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Go Ahead!!"
                })
                .then((result) => {
                    if (result.isConfirmed) {
                      toast.success(res.data.message)
                      fetchAds()
                      Swal.fire({
                        title: "Success !",
                        text: "Advertisement has been activated !",
                        icon: "success"
                        });
                    }
                })
            
          }else{
            toast.error(res.data.message)
          }
      })

      .catch((err)=>{
      toast.error(err.message)
    })
    
  }

  const reject=(id)=>{
      let formData={
        _id:id,
        status:2
      }
      console.log(id);
      

      apiServices.adsChangeStatus(formData)
      .then((res)=>{
          if(res.data.success){
            Swal.fire({
                title:"Are you sure you want to reject this ad ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "blue",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Go Ahead!!"
                })
                .then((result) => {
                    if (result.isConfirmed) {
                      toast.success(res.data.message)
                      fetchAds()
                      Swal.fire({
                        title: "Success !",
                        text: "Advertisement has been disapproved !",
                        icon: "success"
                        });
                    }
                })
            
          }else{
            toast.error(res.data.message)
          }
      })

      .catch((err)=>{
      toast.error(err.message)
    })
    
  }

    return(
        <>
          <div className="container mt-4 pb-4">
             
              {load?<HashLoader color="blue" style={{display:"block", margin:"auto"}}/>:
                <>
                  <h2 className="mb-5 fs-1 text-center text-light fw-bold">Ads Management</h2>
                  <table className="table table-hover text-center table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Guide</th>
                        <th>Banner Image</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad,index)=>(
                          <tr key={index}>
                            <td>{ad?.addedById?.name}</td>
                            <td><img src={ad?.adsImage} height="100px" width="100px" className="img-flu" /></td>

                            <td>{ad?.duration} Days</td>
                            <td>{ad?.description}</td>
                            <td>${ad?.cost}</td>
                            <td>{ad.status==0?
                              <span className="badge bg-warning badge-status">Pending</span>
                              :
                              ad.status==1?
                              <span className="badge bg-success badge-status">Approved</span>
                              :
                              <span className="badge bg-danger badge-status">Rejected</span>}
                            </td>
                            
                            {ad?.status==0?
                            <td>

                              <button className="btn btn-success me-1" onClick={()=>(approve(ad._id, ad?.status))}>
                                  <i className="bi bi-check" />
                              </button>

                              <button className="btn btn-danger" onClick={()=>(reject(ad._id, ad?.status))}>
                                  <i className="bi bi-x"></i>
                              </button>
                            </td>
                            :
                            <td>
                              No more action needed
                            </td>
                            }
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              }

          </div>
        </>
    )
}