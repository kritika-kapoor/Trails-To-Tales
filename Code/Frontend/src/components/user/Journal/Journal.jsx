import React, { useEffect, useState } from 'react';
import { FaPaperPlane, FaPenFancy, FaBookOpen, FaFeatherAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Journal.css';
import apiServices from '../../Services/apiServices';


 

const Journal = () => {
  const [destinationData, setDestinationData] = useState([])
  const [location,setLocation]=useState("")

  const fetchDestinations = ()=>{
          apiServices.allDestinations()
          .then((res)=>{
              if(res.data.success){
                setDestinationData(res.data.destinationData)
                console.log(res);
                
              }
              else{
                console.log(res.data.message);
              }
          })
          .catch((err)=>{
            console.log(err.message);
          })
        }
  
    useEffect(()=>{
      fetchDestinations()
    },[])



  let formData = {
    userId:sessionStorage.getItem("Id")
  }

   const fetchUser=()=>{
    apiServices.allUsersProfile(formData)
    .then(async(res)=>{
      if(res.data.success){      
       console.log(res);
      }
      else{
        console.log(res.data.message)
      }
    })
    .catch((err=>{
      console.log(err.message)
    }))
  }

   const addJournal=()=>{
    apiServices.addJournal(journalFormData)
    .then(async(res)=>{
      if(res.data.success){      
       toast.success(res.data.message)
       window.location.reload()
      }
      else{
        console.log(res.data.message)
      }
    })
    .catch((err=>{
      console.log(err.message)
    }))
  }

  useEffect(()=>{
    fetchUser()
  },[])





  const [blogData, setBlogData] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

    let journalFormData = {
    journalTitle : blogData.title,
    destinationId: location,
    journalDescription:blogData.content,
    addedById:sessionStorage.getItem('Id')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addJournal()
      
      setBlogData({
        title: '',
        content: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
        <div className="journal-container">
      {/* <ToastContainer /> */}
      
      <div className="journal-header">
        <div className="header-content">
          <FaBookOpen className="header-icon pulse me-4" />
          <h1 className="header-title">My Journal</h1>
          <p className="header-subtitle">Share your adventure with the world</p>
        </div>
        <div className="header-wave"></div>
      </div>
      
      <div className="journal-form-container">
        <div className="form-card">
          <div className="card-header">
            <FaFeatherAlt className="card-icon" />
            <h2>Compose Your Masterpiece</h2>
            <div className="card-decoration"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="journal-form">
            <div className="form-group floating-label-group">

              
             <select required className='form-select form-control' id='location' onChange={(e)=>{setLocation(e.target.value)}} >
                  <option key={0} defaultValue>Select Destination</option>
                      {destinationData.map((destination,index)=>(
                          <option key={index+1} value={destination._id}>
                              {destination.destinationName}
                          </option>
                        ))}
                </select>
              
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>

            <div className="form-group floating-label-group">


              <input
                type="text"
                minLength={10}
                id="title"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="form-control"
                required
                placeholder=" "
              />
              {!blogData.title&&
              <label htmlFor="title" className="floating-label">Blog Title</label>
              }
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            
            <div className="form-group floating-label-group">
              <textarea
                id="content"
                minLength={40}
                name="content"
                value={blogData.content}
                onChange={handleChange}
                className="form-control"
                rows="10"
                required
                placeholder=" "
              ></textarea>
              {!blogData.content&&
              <label htmlFor="content" className="floating-label">Your Creative Story</label>
              }
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            
            <button
              type="submit"
              className="publish-button glow-on-hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                <>
                  <FaPaperPlane className="button-icon" />
                  Publish Your Masterpiece
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      <div className="journal-footer">
        <p>Your words have power. Share them wisely.</p>
      </div>
    </div>
    </>

  );
};

export default Journal;