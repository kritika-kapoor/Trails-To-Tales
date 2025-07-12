import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import apiServices from '../../Services/apiServices';
import { toast } from 'react-toastify';
import './Registeruser.css';


export default function RegisterUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [imageName, setImageName] = useState('')
    const [image, setImage] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null)
    const navigate = useNavigate();

    let formData = new FormData()
        formData.append("name",name)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("phoneNumber",phone)
        formData.append("address",address)
        formData.append("userImage",image)

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
        console.log(e.target.files[0]);
        
        setImage(file)   
        setImageName(e.target.value)  
        console.log(formData);
           
      } 
      else{
        setPreviewUrl(null);
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      apiServices.register(formData)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message)

            let loginData = {
              email: email,
              password: password
            };

            apiServices.login(loginData)
              .then((res) => {
                if (res.data?.success) {
                  toast.success(res.data?.message);
                  sessionStorage.setItem("Id", res?.data?.commonData?._id)
                  sessionStorage.setItem("token", res.data.token);
                  sessionStorage.setItem("name", res.data.commonData.name);
                  sessionStorage.setItem("userType", res.data.commonData.userType);
                  sessionStorage.setItem("isLogin", true);
                  sessionStorage.setItem("profilePic" , res?.data?.userData?.userImage)

                  if (res.data?.commonData?.userType == 1) {
                    navigate("/admin");
                  } else if (res.data?.commonData?.userType == 2) {
                    navigate("/user");
                  } else {
                    navigate("/guide");
                  }
                } 
                
                else {
                  toast.error(res.data?.message);
                }

              })
              .catch((err) => {
                toast.error(err?.message);
              });
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }

    return (
      <div className="register-wrapper">
        <div className="container main-contanier mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-12"> 
              <form onSubmit={handleSubmit}>
                  {/* Image Preview */}
                  {/* Profile Image Upload and Preview */}
                  <div className="text-center mb-4">
                    <h2 className="text-center mb-4 register-heading">Register as User</h2>
                    <label htmlFor="profileImageInput">
                      <div style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '50%',
                          backgroundColor: '#fcfcfcb6',
                          border: '2px dashed #ccc',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          margin: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Profile"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <span style={{ color: '#999' }}>Click to upload</span>
                        )}
                      </div>
                    </label>

                    <input
                      required  
                      type="file"
                      id="profileImageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {/* Name and Email */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Name</label>
                      
                      <input
                        required
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />

                    </div>

                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        required
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password and Phone */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">Password</label>
                      
                      <input
                        required
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        minLength={8}
                        maxLength={15}
                      />

                    </div>

                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        required
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        minLength={10}
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <label htmlFor="address" className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        id="address"
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        required
                        
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="row justify-content-center mb-3">
                    <div className="col-md-6 d-grid">
                      <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                  </div>

                  {/* Login Link */}
                  <div className="text-center">
                    Already have an account?{' '}
                    <span onClick={() => navigate('/login')} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
                      Login here
                    </span>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}