import React, { useState, useRef, useEffect } from 'react';
import './Gallery.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiPlus, FiUpload, FiGlobe, FiLock, FiMapPin } from 'react-icons/fi';
import apiServices from '../../Services/apiServices';
import Swal from 'sweetalert2';

const Gallery = () => {
  const [destinationData, setDestinationData] = useState([]);
  const [destination, setDestination] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isPublic, setIsPublic] = useState(false); // Track public/private state
  const fileInputRef = useRef(null);
  const [albumName, setAlbumName]= useState("")

  const fetchDestinations = () => {
    apiServices.allDestinations()
      .then((res) => {
        if (res.data.success) {
          setDestinationData(res.data.destinationData);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPhotos = files.map(file => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file)
      }));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAddMore = () => {
    triggerFileInput();
  };

  const resetForm = () => {
    setDestination('');
    setPhotos([]);
    setIsPublic(false);
  };

  const removePhoto = (id) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const handlePublicClick = () => {
     Swal.fire({
                title: "Your Images will be uploaded to public !!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "Blue",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Go Ahead!!"
              }).then((result) => {
                if (result.isConfirmed) {
                    setIsPublic(true);
                    addGallery(true);
                  Swal.fire({
                    title: "Images uploaded!",
                    text: "your images have been uploaded !",
                    icon: "success"
                  });
                }
              });
    
  };

  const handlePrivateClick = () => {
     Swal.fire({
                title: "Your Images will be uploaded privately !!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "Blue",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Go Ahead!!"
              }).then((result) => {
                if (result.isConfirmed) {
                      setIsPublic(false);
                      addGallery(false);
                  Swal.fire({
                    title: "Images uploaded!",
                    text: "your images have been uploaded !",
                    icon: "success"
                  });
                }
              });
   
  };

  const addGallery = (isPublic) => {
    const formData = new FormData();
    formData.append("albumName", albumName);
    
    if (destination) {
      formData.append("destinationId", destination);
    }
    
    formData.append("isPublic", isPublic);
    
    // Append each photo file to the FormData
    photos.forEach(photo => {
      formData.append("galleryImages", photo.file);
    });

    apiServices.addGallery(formData)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message)
          resetForm();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to upload photos. Please try again.');
      });
  };

  return (
    <>
      <div className="gallery-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        
        <div className="gallery-card">
          <h2 className="gallery-title">Share Your Travel Experience</h2>
          
          <div className="destination-input-container">

            <input value={albumName} onChange={(e)=>{setAlbumName(e.target.value)}} placeholder='Album Name' className='form-control my-5 destination-input py-3'/>

            
            <select
              value={destination}
              onChange={handleDestinationChange}
              className="destination-input form-select"
            > 
              <option value="" disabled selected>Select Destination</option>
              {destinationData.map((destination, index) => (
                <option key={index} value={destination._id}>
                  {destination.destinationName}
                </option>
              ))}
            </select>
          </div>

          <div className="upload-section">
            {photos.length === 0 && (
              <button className="upload-btn" onClick={triggerFileInput}>
                <FiUpload className="upload-icon" /> Upload Photos
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              multiple
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          {photos.length > 0 && (
            <>
              <div className="photos-container">
                <h4 className="photos-title">Your Photos</h4>
                <div className="photos-grid">
                  {photos.map((photo, index) => (
                    <div key={photo.id} className="photo-item">
                      <img src={photo.preview} alt={`Preview ${index}`} className="photo-preview" />
                      <button className="remove-btn" onClick={() => removePhoto(photo.id)}>
                        <span>×</span>
                      </button>
                      {index === photos.length - 1 && (
                        <button className="add-more-btn" onClick={handleAddMore}>
                          <FiPlus className="add-icon" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button className="public-btn" onClick={handlePublicClick}>
                  <FiGlobe className="btn-icon" /> Share Publicly
                </button>
                <button className="private-btn" onClick={handlePrivateClick}>
                  <FiLock className="btn-icon" /> Keep Private
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;