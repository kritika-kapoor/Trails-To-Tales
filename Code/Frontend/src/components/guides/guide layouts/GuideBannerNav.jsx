import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiServices from "../../Services/apiServices";

export default function GuideBannerNav(){
    const loc = useLocation()
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [profilePic,setProfilePic] = useState("")    
    const nav = useNavigate()

    const fetchGuide=()=>{
        let formData = {
        userId:sessionStorage.getItem("Id")
    }
        apiServices.allGuidesForProfile(formData)
        .then((res)=>{
            if(res.data.success){
            setProfilePic(res?.data?.guideData[0]?.guideImage)
                
            }
            else{
                console.log(res);
            }
        })
        .catch((err)=>{
            console.log(err.message);
            
        })
    }
    useEffect(()=>{
           fetchGuide();
    },[])

        if(loc.pathname==='/guide/guidecontact'){
            var currentPage = 'Contact us'
        }
       
        if(loc.pathname==='/guide'){
            var currentPage = 'Welcome Guide    !'
        }
        if(loc.pathname==='/guide/guideservices'){
            var currentPage = 'Add Services'
        }
        if(loc.pathname==='/guide/guideadrequest'){
            var currentPage = 'Advertisement'
        }
        
        const logout=()=>{
                Swal.fire({
                    title: "Are you sure you want to logout ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "Blue",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Logout!!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                        sessionStorage.clear()
                        nav("/")
                      Swal.fire({
                        title: "Logout!",
                        text: "You have been logged out !",
                        icon: "success"
                      });
                    }
                  });
            }
    
        return(
            <div className="container-fluid bg-dark text-light  hero-header">
                
                {/* Navbar */}
                <div className="container-fluid position-relative p-0">
                    <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-lg-0 sticky-top">
                    <Link to='/guide' className="navbar-brand p-0">
                        <h1 className="text-primary m-0">
                        Trails To Tales
                        </h1>
                    </Link>
    
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="fa fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse text-dark" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                        <Link to='/guide' className={`nav-item nav-link ${loc.pathname==='/guide'?'active':''}`}>
                            Home
                        </Link>
    
                        <Link to='/guide/reviews' className={`nav-item nav-link ${loc.pathname==='/guide/reviews'?'active':''}`}>
                            My Reviews
                        </Link>

                        <Link to='/guide/guideadrequest' className={`nav-item nav-link ${loc.pathname==='/guide/guideadrequest'?'active':''}`}>
                            Advertise
                        </Link>
    
                        
                        <Link to='/guide/guidecontact' className={`nav-item nav-link ${loc.pathname==='/guide/guidecontact'?'active':''}`}>
                            Contact us
                        </Link>
                         
                         <div className="dropdown pe-3 align-self-center" 
                             onMouseEnter={() => setShowProfileDropdown(true)}
                             onMouseLeave={() => setShowProfileDropdown(false)}>
                            <div className="d-flex pe-5 align-items-center" style={{cursor: 'pointer'}}>
                                {profilePic?
                                <img 
                                    src={profilePic}
                                    alt="Pic" 
                                    className="rounded-circle me-2 border border-primary" 
                                    style={{width: '40px', height: '40px'}}
                                />
                                :
                                <i className="bi bi-person border rounded-circle fs-3 px-3 py-1 me-1 text-bg-dark"/>
                                }
                                <span className="dropdown-toggle"></span>
                            </div>
                            <div className={`dropdown-menu dropdown-menu-end  ${showProfileDropdown ? 'show' : ''}`}>
                                <Link to='/guide/profile' className="dropdown-item">View Profile</Link>
                               <button className="dropdown-item" onClick={logout}>Logout</button>
                            </div>
                        </div>

                        </div>

                        
                       
                    </div>
                    </nav>    
                </div>
    

    
            </div>
        )
}