import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./GuideAdRequest.css";
import apiServices from "../../../Services/apiServices";
import { HashLoader } from "react-spinners";

export default function GuideAdRequest() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description,setDescription]= useState("")
  const [duration, setDuration] = useState();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [load,setLoad] = useState(false)

  let formData = new FormData()
    formData.append('adsName',name)
    formData.append('duration',duration)
    formData.append('description',description)
    formData.append('adsImage',image)


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageError(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true)


    apiServices.addAds(formData)
      .then((res)=>{
        console.log(res);
        
        if(res.data.success){          
          toast.success(res.data.message)
          setLoad(false)
          navigate('/guide')
          
        }
        else{
          toast.error(res.data.message)
          setLoad(false)
        }
      })          
            
      .catch((err)=>{
        toast.error(err.message)
      }) 
  };

  return (
    <div className="d-flex justify-content-center mt-5 pb-5">
      <div className="wave-container" style={{ width: "100%" }}>
        <Card className="shadow p-4 bg-white rounded ad-card">
          
          {load?
          <div style={{height:"30vh"}}>
          <HashLoader color="blue" style={{display:"block", margin:"auto"}}/>
          <span className="d-block text-center text-primary fs-1">Sending your request....</span>
          </div>
          :
          <Card.Body>
            <h4 className="text-center mb-4">Request for Advertisement</h4>

              <form onSubmit={handleSubmit}>
                <div className="row">
                      <div className="mb-3 col-md-6">
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="form-control"
                          placeholder="Enter a title for your advertisement"
                        />
                      </div>


                      <div className="mb-3 col-md-6">
                        <label className="form-label">Duration (Months)</label>
                        <input
                          type="number"
                          min="1"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          required
                          className="form-control"
                          placeholder="Enter the duration for your advertisement"
                        />
                      </div>

                       <div className="mb-3 col-md-12">
                        <label className="form-label">Description</label>
                        <textarea
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="form-control"
                          placeholder="Enter a description/tagline"
                        />
                      </div>
                </div>

                {/* Image Upload */}
                <div className="image-upload-section text-center mt-4 ">
                      <label className="form-label">Upload Image</label>
                      <div className="d-flex align-items-center justify-content-center">
                          <div
                        className={`upload-box form-control rounded d-flex align-items-center justify-content-center ${imageError ? "border-danger" : ""}`}
                        onClick={() => document.getElementById("imageUpload").click()}
                        style={{
                          width: "500px",
                          height: "200px",
                          cursor: "pointer",
                          backgroundColor: "#f8f9fa",
                          overflow: "hidden",
                          border:"dashed 1px black"
                        }}
                      >
                        {preview ? (
                          <img src={preview} alt="Preview" className="preview-img " />
                        ) : (
                          <span className="text-muted fs-1 fw-light">+</span>
                        )}
                      </div>
                      </div>
                    
                      
                  
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                </div>

                <div className="text-center mt-4">
                      <Button variant="primary" type="submit" className="submit-btn">
                        Send Request
                      </Button>
                </div>
              </form>

          </Card.Body>
          }

        </Card>
      </div>
     
    </div>
  );
}
