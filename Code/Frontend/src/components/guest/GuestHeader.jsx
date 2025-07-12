import { Link, useLocation } from "react-router-dom";

export default function GuestHeader(){
    var loc = useLocation()
    return(
        <>
             {/* Navbar */}
             <div className={`container-fluid position-relative p-0 mb-4 ${loc.pathname==='/'&&'guestBannerDiv'}`}>
               
                <nav className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-lg-0 sticky-top ${loc.pathname==='/'?'':'bg-dark'}`}>
                <Link to='/' className="navbar-brand p-0">
                    <h1 className="text-primary m-0 d-none">
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
                    <div className=" guestNav navbar-nav ms-auto py-0">
                    
                    <Link to='/' className={`nav-item  nav-link ${loc.pathname==='/'?'active':''}`}>
                       Home
                    </Link>
                    <Link to='/guestabout' className={`nav-item nav-link ${loc.pathname==='/guestabout'?'active':''}`}>
                        About
                    </Link>
                    <Link to='/guestdestination' className={`nav-item nav-link ${loc.pathname==='/guestdestination'?'active':''}`}>
                        Destinations
                    </Link>
                    <Link to='/guestcommunity' className={`nav-item nav-link ${loc.pathname==='/guestcommunity'?'active':''}`}>
                        Community
                    </Link>
                    <Link to='/guestcontact' className={`nav-item nav-link ${loc.pathname==='/guestcontact'?'active':''}`}>
                        Contact
                    </Link>
                    </div>
                    <Link to='/login' className="btn btn-primary rounded-pill py-2 px-4">
                    Log in
                    </Link>
                </div>
                </nav>   

                {loc.pathname==='/'&&
                <div className="guestBannerText text-light px-3 py-3">
                    <span className="d-block head lh-1 my-4 mb-5 mb-lg-4 ">WELCOME TO TRAILS TO TALES</span>
                    <span className="d-block subHead fs-3 font-italic mb-4 mb-lg-0">Your one stop solution to all your travel needs</span>
                    
                    <div className="listDiv w-50">
                        <button className="btn btn-primary disabled py-3 px-5 me-3 fs-4">Planning</button>
                        <button className="btn btn-warning disabled py-3 px-5 me-3 fs-4">Journaling</button>
                        <button className="btn btn-success disabled py-3 px-5 me-3 fs-4">Sharing</button>
                    </div>
                </div>
                }
                 
            </div>
        </>
    )
}