import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function AdminNav(){
    var loc = useLocation()
    const nav = useNavigate()

    const logout=()=>{
        Swal.fire({
                    title: "Are you sure you want to logout ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "blue",
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
        <>
            <div className="container-fluid" >
                <div className="row admin-nav-row">             
                   <div className="col" >
                        <div className="container-fluid" >
                            <nav className="admin-nav navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-lg-0" >
                                <Link to='/admin' className="navbar-brand p-0">
                                    <h1 className="text-primary fw-bold m-0">
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
                                    <div className="admin-nav-items navbar-nav ms-auto py-0">
                                    <Link to='/admin' className={`nav-item nav-link  ${loc.pathname==='/admin'?'active':''}`}>
                                        Dashboard
                                    </Link>

                                    <Link to='/admin/manageUsers' className={`nav-item nav-link  ${loc.pathname==='/admin/manageUsers'?'active':''}`}>
                                        Users
                                    </Link>

                                    <Link to='/admin/manageGuides' className={`nav-item nav-link  ${loc.pathname==='/admin/manageGuides'?'active':''}`}>
                                        Guides
                                    </Link>

                                    <Link to='/admin/manageAds' className={`nav-item nav-link  ${loc.pathname==='/admin/manageAds'?'active':''}`}>
                                        Advertisements
                                    </Link>

                                    <Link to='/admin/manageDestination' className={`nav-item nav-link  ${loc.pathname==='/admin/manageDestination'?'active':''}`}>
                                        Destinations
                                    </Link>
                                    </div>
                                    
                                    <Link onClick={logout} className="btn btn-danger rounded-pill py-2 px-4">
                                    Log Out
                                    </Link>
                                </div>
                            </nav>    
                        </div>
                   </div>        
                </div>
            </div>
        </>
    )
}