import React, { useEffect, useState } from 'react';
import './UserViewProfile.css';
import apiServices from '../../Services/apiServices';
import { Link } from 'react-router-dom';

const UserViewProfile = () => {
  const formData = {
    userId:sessionStorage.getItem("Id")
  }
  const formData2 = {
    addedById:sessionStorage.getItem("Id")
  }

  const [jounalData,setJournalData] = useState([])
  const fetchJournals = ()=>{
    apiServices.allJournal(formData2)
    .then((res)=>{
              if(res.data.success){
                setJournalData(res.data.journalData)
                console.log(res.data.journalData);
                
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
      fetchJournals()
  },[])


   const [galleryData,setGalleryData] = useState([])
   const fetchGallery = ()=>{
        apiServices.allGallery(formData2)
        .then((res)=>{
                  if(res.data.success){
                    setGalleryData(res.data.galleryData)
                    console.log(res.data.galleryData);
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
          fetchGallery()
      },[])

  const id = sessionStorage.getItem("ID")
  
  const [userData, setUserData]= useState([])

  const fetchUser = ()=>{
    apiServices.allUsersProfile(formData)
    .then((res)=>{
      console.log(res.data.userData[0]);
      setUserData(res.data.userData[0])
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    fetchUser()
  },[])

  useEffect(()=>{
    if(userData){
       setProfile({
        name: userData?.userId?.name,
        email: userData?.userId?.email,
        phone: userData?.phoneNumber,
        address: userData?.address,
        isEditing: false
      })
      setUserId(userData?.userId?._id)
    }
  },[userData])

  // Profile data state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    isEditing: false
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState('blogs');

  // Dummy data for blogs
  const blogs = [
    { 
      id: 1, 
      title: 'Manali', 
      date: 'May 15, 2023',
      content: 'This was an incredible journey through the Rocky Mountains. The views were breathtaking and the wildlife encounters were unforgettable. We started our hike at dawn, with the mist still clinging to the valleys below. As we ascended, the panorama unfolded before us - jagged peaks stretching as far as the eye could see. The crisp mountain air and the sense of accomplishment at reaching the summit made this one of my most memorable adventures to date.',
      images: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ]
    },
    { 
      id: 2, 
      title: 'Africa', 
      date: 'April 10, 2023',
      content: 'Hiking the Grand Canyon was a life-changing experience. The layers of rock tell a story millions of years in the making. We took the Bright Angel Trail down into the canyon, with each switchback revealing new perspectives of the towering cliffs. The play of light and shadow across the rock faces was mesmerizing, changing by the minute. At Plateau Point, we watched the sunset paint the canyon walls in fiery hues. Camping at the bottom near Phantom Ranch, with the Colorado River roaring nearby, was an experience I\'ll never forget.',
      images: [
        'https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ]
    }
  ];

  // Dummy data for gallery
  const gallery = [
    { 
      destination: 'Switzerland', 
      images: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ]
    },
    { 
      destination: 'London', 
      images: [
        'https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1470114716159-e389f8712fda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ]
    },
    { 
      destination: 'Yosemite National Park', 
      images: [
        'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ]
    }
  ];


  const [bookings,setBookings]= useState([])
    const [userId, setUserId]= useState()

    
    const [isReady, setIsReady] = useState(false);
  
    useEffect(() => {
      // Wait until guideId is defined
      if (userId) {
        setIsReady(true);
      }
    }, [userId]);
  
    useEffect(() => {
      if (!isReady) return;
  
      const bookingFormData = {
        userId: userId
      };
  
      const fetchBooking = async () => {
        try {
          const res = await apiServices.allBookingsForProfile(bookingFormData);
          if (res.data.success) {
            setBookings(res?.data?.bookingData[0])
            console.log(res);
            
          } else {
            console.log(res.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchBooking();
    }, [isReady, userId]);
  

  const bookedGuides = [
    { 
      id: 1, 
      name: bookings?.guideId?.userId?.name, 
      location: bookings?.destinationId?.destinationName, 
      contact: bookings?.guideId?.phoneNumber,
      rate: bookings?.guideId?.amountPerDay,
      image: bookings?.guideId?.guideImage,
      date: bookings?.dateOfBooking,
      numberOfDays: bookings?.numberOfDays
    }
  ];
  

  // Dummy data for followers
  const followersCount = 42;

  // State for modals
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setProfile(prev => ({ ...prev, isEditing: !prev.isEditing }));
  };

  const handleSave = () => {
    // API save would go here
    setProfile(prev => ({ ...prev, isEditing: false }));
  };


  return (
    <div className="profile-page">
      {/* Header */}
      <div className="page-header">
        <h1>User Profile</h1>
        <p>Welcome to your Trails to Tales</p>
      </div>

      {/* Profile Section */}
      <div className="row profile-section">
        <div className="col profile-card">
          <div className="profile-header">
            <div className="profilepicture d-flex justify-content-center mb-2">
              <img 
                src={userData?.userImage} 
                alt="" 
                className="profile-pic"
              />
            </div>
            <h2>{profile.name}</h2>
          </div>
          
          <div className="profile-details">
            <div className="detail-group">
              <label>Email</label>
              {profile.isEditing ? (
                <input type="email" name="email" value={profile.email} onChange={handleInputChange} />
              ) : (
                <div className="detail-value">{profile.email}</div>
              )}
            </div>

            <div className="detail-group">
              <label>Phone</label>
              {profile.isEditing ? (
                <input type="tel" name="phone" value={profile.phone} onChange={handleInputChange} />
              ) : (
                <div className="detail-value">{profile.phone}</div>
              )}
            </div>
            
            <div className="detail-group">
              <label>Address</label>
              {profile.isEditing ? (
                <textarea name="address" value={profile.address} onChange={handleInputChange} />
              ) : (
                <div className="detail-value">{profile.address}</div>
              )}
            </div>
            
            <div className="profile-actions">
              <Link className='ms-1 save-btn text-decoration-none' to={'/user/changePassword'}>Change Password</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Journals & Gallery Card (Full Width) */}
      <div className="full-width-card">
        <div className="info-card">
          <div className="card-tabs">
            <div 
              className={`tab ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              My Blogs
            </div>
            <div 
              className={`tab ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </div>
          </div>
          
          <div className="tab-content">
            {/* Blogs Tab Content */}
            {activeTab === 'blogs' && (
              <div className="tab-pane active">
                <h3>My Adventure Blogs</h3>
                <div className="blogs-list">

                  {jounalData.map(blog => (
                    <div 
                      key={blog.id} 
                      className="blog-item" 
                      onClick={() => {
                        setSelectedBlog(blog);
                        setShowBlogModal(true);
                      }}
                    >
                      <div className="blog-header">
                        <span className="blog-title">{blog.journalTitle}</span>
                      </div>
                      <div className="blog-preview">
                        {blog.journalDescription.substring(0, 100)}...
                      </div>
                     
                    </div>
                  ))}

                  

                </div>
              </div>
            )}
            
            {/* Gallery Tab Content */}
            {activeTab === 'gallery' && (
              <div className="tab-pane active">
                <h3>My Travel Gallery</h3>
                <div className="gallery-grid">
                  {galleryData.map((item, index) => (
                    <div 
                      key={index} 
                      className="gallery-item" 
                      onClick={() => {
                        setSelectedGallery(item);
                        setShowGalleryModal(true);
                      }}
                    >
                      <div className="gallery-destination">{item?.destinationId?.destinationName}</div>
                      <div className="gallery-preview">
                        <img src={item.galleryImages[0]} alt={item?.destinationId?.destinationName} className="gallery-thumbnail" />
                        <div className="image-count">{item.galleryImages.length} photos</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Cards (Booked Guides and Followers) */}
      <div className="bottom-cards">
        {/* Booked Guides Card */}
        <div className="info-card w-50">
          <h3>Booked Guides</h3>
          <div className="card-content">
            {bookedGuides.map(guide => (
              <div key={guide.id} className="guide-item w-75">
                <div className="guide-header">
                  <img src={guide.image} alt={guide.name} className="guide-image" />
                  <span className="guide-name">{guide.name}</span>
                </div>
                <div className="guide-details">
                  <span className="guide-location">Location: {guide.location}</span>
                  <span className="guide-contact">Contact: {guide.contact}</span>
                  <span className="guide-rate">Rate: ${guide.rate}</span>
                  <span className="guide-rate">Date: {guide.date}</span>
                  <span className="guide-rate">Number of Days: {guide.numberOfDays}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Blog Modal */}
      {showBlogModal && selectedBlog && (
        <div className="modal-overlay" onClick={() => setShowBlogModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBlogModal(false)}>&times;</button>
            <h2>{selectedBlog.journalTitle}</h2>
           
            <div className="modal-text">{selectedBlog.journalTitle}</div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && selectedGallery && (
        <div className="modal-overlay" onClick={() => setShowGalleryModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowGalleryModal(false)}>&times;</button>
            <h2>{selectedGallery.destinationId.destinationName}</h2>
            <div className="gallery-modal-images">
              {selectedGallery.galleryImages.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={selectedGallery.destinationId.destinationName} 
                  className="gallery-modal-image" 
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserViewProfile;