import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

    //Use effect hook to animate on reload
    useEffect(() => {
    
        const elements = document.querySelectorAll(".animate-on-load");
        elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("animate");
        }, index * 200);
        });
    }, []);

  return (
    <>
      <div className="register-page">
        <div className="glass-card">
          <h1 className="text-center mb-4 animate-on-load">
            <span className="logo-text">Trails to Tales</span>
          </h1>

          <p className="text-center mb-5 animate-on-load">
            Become a part of our vibrant travel community
          </p>

          <div className="options-container ">
            {/* User Registration Card */}
            <div className="role-option d-block user-option animate-on-load">
              <div className="inner-card me-4 me-md-0">
                <div className="icon-container">👤</div>
                <h3>Register as User</h3>
                <p>
                  Explore destinations, share experiences, and connect with fellow travelers.
                </p>
                <button className="continue-btn btn-light user-btn" onClick={() => navigate("/register/user")}>
                  Continue as User
                </button>
              </div>
            </div>

            <div className="or-divider animate-on-load">OR</div>

            {/* Guide Registration Card */}
            <div className="role-option guide-option animate-on-load">
              <div className="inner-card me-4 me-md-0">
                <div className="icon-container">🗺️</div>
                <h3>Register as Guide</h3>
                <p>
                  Help travelers explore like a local, offer services, and showcase your expertise.
                </p>
                <button className="continue-btn btn-dark guide-btn" onClick={() => navigate("/register/guide")}>
                  Continue as Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
          
        
      

      
    </>
    
  );
}