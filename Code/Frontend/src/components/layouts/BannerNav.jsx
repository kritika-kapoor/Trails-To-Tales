import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function BannerNav(){
    const loc = useLocation()
    const nav = useNavigate()
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const [search,setSearch]=useState("")

    const profilePic = sessionStorage.getItem("profilePic")

    if(loc.pathname==='/user'){
        var currentPage = 'Home'
    }
    if(loc.pathname==='/user/about'){
        var currentPage = 'About'
    }
    else if(loc.pathname==='/user/service'){
        var currentPage = 'Service'
    }
    if(loc.pathname==='/user/contact'){
        var currentPage = 'Contact'
    }
   
    if(loc.pathname==='/user/guides'){
        var currentPage = 'Guides'
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
            <div className={`container-fluid bg-dark text-light hero-header ${loc.pathname==='/user'?'userPageBanner':''}`}>
                
                {/* Navbar */}
                <div className="container-fluid position-relative p-0">
                    <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-lg-0 sticky-top">
                    <Link to='/user' className="navbar-brand p-0">
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
                        <Link to='/user' className={`nav-item nav-link ${loc.pathname==='/user'?'active':''}`}>
                            Home
                        </Link>
    
                        <Link to='/user/about' className={`nav-item nav-link ${loc.pathname==='/user/about'?'active':''}`}>
                            About
                        </Link>
    
                        <div className="nav-item dropdown" 
                             onMouseEnter={() => setShowServicesDropdown(true)}
                             onMouseLeave={() => setShowServicesDropdown(false)}>
                            <div className="d-flex align-items-center">
                                <Link  className={`nav-link me-2 ${loc.pathname==='/user/planner'?'active':''}`}>
                                    Services
                                </Link>
                                <span className="dropdown-toggle me-3" style={{cursor: 'pointer'}}></span>
                            </div>
                            <div className={`dropdown-menu ${showServicesDropdown ? 'show' : ''}`}>
                                <Link to='/user/planner' className={`dropdown-item  ${loc.pathname==='/user/planner'?'disabled':''}`}>Planner</Link>
                                <Link to='/user/journal' className={`dropdown-item  ${loc.pathname==='/user/journal'?'disabled':''}`}>Journal</Link>
                                <Link to='/user/gallery' className={`dropdown-item  ${loc.pathname==='/user/gallery'?'disabled':''}`}>Gallery</Link>
                            </div>
                        </div>
    
                        <Link to='/user/community' className={`nav-item nav-link ${loc.pathname==='/user/community'?'active':''}`}>
                            Community
                        </Link>

                        <Link to='/user/guides' className={`nav-item nav-link ${loc.pathname==='/user/guides'?'active':''}`}>
                            Guides
                        </Link>
                        
                        <Link to='/user/contact' className={`nav-item nav-link ${loc.pathname==='/user/contact'?'active':''}`}>
                            Contact
                        </Link>
                        
                         <div className="dropdown align-self-center" 
                             onMouseEnter={() => setShowProfileDropdown(true)}
                             onMouseLeave={() => setShowProfileDropdown(false)}>
                            <div className="d-flex align-items-center" style={{cursor: 'pointer'}}>
                                <img 
                                    src={profilePic} 
                                    alt="Profile" 
                                    className="rounded-circle me-2 border border-primary" 
                                    style={{width: '40px', height: '40px'}}
                                />
                                <span className="dropdown-toggle"></span>
                            </div>
                            <div className={`dropdown-menu dropdown-menu-end ${showProfileDropdown ? 'show' : ''}`}>
                                <Link to='/user/profile' className="dropdown-item">View Profile</Link>
                                <button className="dropdown-item" onClick={logout}>Logout</button>
                            </div>
                        </div>

                        </div>
                        
                       
                    </div>
                    </nav>    
                </div>
    
                {/* Banner */}
                <div className={`container pb-5 ${loc.pathname!='/user'?'d-none':''}`}>
                    <div className="row justify-content-center py-5">
                    <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                        <h1 className="display-3 fw-bold text-white mb-3 animated slideInDown">
                       Search Your Destination
                        </h1>
                        <p className="fs-4 fw-bold text-white mb-4 animated slideInDown">
                        From Trails To Timeless Tales
                        </p>
                        <div className="position-relative w-75 mx-auto animated slideInDown">
                        <input
                            className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                            type="text"
                            placeholder="Eg: Thailand"
                            required
                            value={search}
                            onChange={(e)=>{setSearch(e.target.value)}}
                        />
                        <button
                            type="button"
                            className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                            style={{ marginTop: 7 }}
                            onClick={()=>{
                                if(!!search.trim()){
                                    nav("/user/community")}}
                                }
                        >
                            Search
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
    
            </div>
        )
}