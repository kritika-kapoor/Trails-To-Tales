
import React, { useState, useEffect } from 'react';
import './Community.css';
import { useNavigate } from 'react-router-dom';
import apiServices from '../../Services/apiServices';

const Community = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [topProfiles, setTopProfiles] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);
  const [likedGalleries, setLikedGalleries] = useState([]);

  const nav = useNavigate()

  const id = sessionStorage.getItem("Id")
  const [journals,setJournals]=useState([])
  const [galleryData,setGalleryData] = useState([])
  const [users,setUsers]=useState([])
  const [userId, setUserId]=useState("")
    const fetchUsers=()=>{
          apiServices.allUsers()
          .then((res)=>{  
              
              if(res.data.success){
                  setUsers(res.data.userData)                    
                  console.log(res.data.userData);
                  
              }else{
                  toast.error(res.data.message)
              }
          })  
          .catch((err)=>{
              toast.error(err.message)
          })  
      }

        useEffect(()=>{
          fetchUsers()
      },[])


  const fetchJournals = ()=>{
    let data={
      addedById:userId
    }
      apiServices.allJournal(data)
      .then((res)=>{
                if(res.data.success){
                  setJournals(res.data.journalData)
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
        if(!!userId){
        fetchJournals()
        }
    },[userId])

    

  const fetchGallery = ()=>{
    let data={
      addedById:userId
    }
      apiServices.allGallery(data)
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
        if(!!userId){
        fetchGallery()
        }
    },[userId])

  

    
  useEffect(() => {
    setTimeout(() => {
      const mockBlogs = [
        {
          id: 1,
          username: 'traveler_jane',
          profilePic: 'https://randomuser.me/api/portraits/women/22.jpg',
          location: 'Bali, Indonesia',
          title: 'My Amazing Bali Adventure',
          content: 'Spent two weeks exploring the beautiful beaches and temples of Bali. The culture is incredible! The food was amazing, especially the traditional Balinese dishes. I visited Ubud, Uluwatu, and the stunning Tegallalang Rice Terrace. The sunset at Tanah Lot temple was absolutely magical.',
          isFollowing: false,
          images: [
            'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          ]
        },
        {
          id: 2,
          username: 'wanderer_mike',
          profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
          location: 'Kyoto, Japan',
          title: 'Cherry Blossom Season',
          content: 'The cherry blossoms were in full bloom during my visit. Absolutely breathtaking views everywhere! I spent days walking through the Philosopher\'s Path, visiting Kinkaku-ji (the Golden Pavilion), and experiencing traditional tea ceremonies. The hanami (flower viewing) parties in Maruyama Park were unforgettable. The blend of ancient temples with the delicate pink sakura was like stepping into a painting.',
          isFollowing: false,
          images: [
            'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          ]
        },
        {
          id: 3,
          username: 'adventure_sofia',
          profilePic: 'https://randomuser.me/api/portraits/women/45.jpg',
          location: 'Patagonia, Chile',
          title: 'Hiking the W Trek',
          content: 'Completed the 5-day W Trek in Torres del Paine. Challenging but worth every step! The views of the granite towers were spectacular, especially at sunrise. We encountered guanacos, foxes, and even a puma from a distance. The weather changed every hour - from sunshine to hail to strong winds. The refugios along the way provided much-needed rest and warm meals. The French Valley was the highlight with its hanging glaciers and panoramic views.',
          isFollowing: false,
          images: [
            'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
          ]
        }
      ];

      const mockTopProfiles = [
        {
          id: 101,
          username: 'travel_guru',
          profilePic: 'https://randomuser.me/api/portraits/men/75.jpg',
          location: 'World Traveler',
          followers: 12500,
          isFollowing: false
        },
        {
          id: 102,
          username: 'beach_lover',
          profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
          location: 'Tropical Islands',
          followers: 8700,
          isFollowing: true
        },
        {
          id: 103,
          username: 'mountain_man',
          profilePic: 'https://randomuser.me/api/portraits/men/90.jpg',
          location: 'The Alps',
          followers: 11200,
          isFollowing: false
        },
        {
          id: 104,
          username: 'city_explorer',
          profilePic: 'https://randomuser.me/api/portraits/women/33.jpg',
          location: 'Global Metropolises',
          followers: 9800,
          isFollowing: false
        }
      ];

      setUserBlogs(mockBlogs);
      setTopProfiles(mockTopProfiles);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFollow = (username, id) => {
    setUserBlogs(prev =>
      prev.map(blog =>
        blog.id === id ? { ...blog, isFollowing: !blog.isFollowing } : blog
      )
    );

    setTopProfiles(prev =>
      prev.map(profile =>
        profile.id === id ? { ...profile, isFollowing: !profile.isFollowing } : profile
      )
    );

    const isNowFollowing =
      userBlogs.find(blog => blog.id === id)?.isFollowing ||
      topProfiles.find(profile => profile.id === id)?.isFollowing;

    setToastMessage(`You ${isNowFollowing ? 'unfollowed' : 'followed'} ${username}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchMoreBlogs = () => {
    setLoading(true);
    setTimeout(() => {
      const newBlog = {
        id: Math.floor(Math.random() * 1000),
        username: `traveler_${Math.random().toString(36).substring(7)}`,
        profilePic: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        location: ['Paris, France', 'New York, USA', 'Tokyo, Japan', 'Sydney, Australia'][Math.floor(Math.random() * 4)],
        title: ['Amazing Trip!', 'Unforgettable Journey', 'Best Vacation Ever'][Math.floor(Math.random() * 3)],
        content: 'This was an incredible experience that I will never forget. The views were breathtaking. The people were friendly and the culture was fascinating. Every day brought new adventures and discoveries that made this trip truly special.',
        isFollowing: false,
        images: [
          'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        ]
      };
      setUserBlogs(prev => [...prev, newBlog]);
      setLoading(false);
    }, 800);
  };
  

  const openStoryModal = (user) => {
    setUserId(user?.userId?._id)
    setActiveBlog(user);
    setActiveModal('story');
  };

  const openGalleryModal = (user) => {
    setUserId(user?.userId?._id)
    setActiveBlog(user);
    setActiveModal('gallery');
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveBlog(null);
  };

  const toggleGalleryLike = (blogId) => {
    if (likedGalleries.includes(blogId)) {
      setLikedGalleries(likedGalleries.filter(id => id !== blogId));
    } else {
      setLikedGalleries([...likedGalleries, blogId]);
    }
  };

  return (
    <div className="community-container">
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-icon">✓</span>
            {toastMessage}
          </div>
        </div>
      )}

      {(activeModal && activeBlog) && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            
            {activeModal === 'story' && (
              <div className="story-modal">
                <div className="modal-header">
                  <div className="profile-info">
                    <div className="profile-pic" style={{ backgroundImage: `url(${activeBlog.userImage})` }}></div>
                    <div className="profile-details">
                      <div className="username">{activeBlog.userId?.name}</div>
                      <div className="location">
                        <span className="location-icon">📍</span>
                        {activeBlog.address}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`follow-btn ${activeBlog.isFollowing ? 'following' : ''}`}
                    onClick={() => handleFollow(activeBlog.username, activeBlog.id)}
                  >
                    {activeBlog.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>

                <div className="modal-body">
                  <h2 className="modal-title">{journals[0]?.journalTitle}</h2>
                  <p className="modal-story-content">{journals[0]?.journalDescription}</p>
                </div>

                <div className="modal-footer">
                  <button 
                    className="action-btn view-gallery"
                    onClick={() => setActiveModal('gallery')}
                  >
                    <span className="btn-icon">🖼️</span> View Gallery
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'gallery' && (
              <div className="gallery-modal">
                
                <h2 className="gallery-title">{galleryData[0].albumName}</h2>
                <p className="gallery-subtitle mt-2"> 📍{galleryData[0].destinationId?.destinationName}</p>
                
                <div className="gallery-grid">
                  {galleryData[0]?.galleryImages?.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <img src={image} alt={`Gallery item ${index + 1}`} />
                    </div>
                  ))}
                </div>

                <div className="gallery-actions">
                  <button 
                    className={`like-btn ${likedGalleries.includes(activeBlog.id) ? 'liked' : ''}`}
                    onClick={() => toggleGalleryLike(activeBlog.id)}
                  >
                    <span className="heart-icon">❤️</span>
                    {likedGalleries.includes(activeBlog.id) ? 'Liked' : 'Like'}
                  </button>
                </div>
               
              </div>
            )}
          </div>
        </div>
      )}

      <div className="community-content">
        <div className="community-hero">
          <div className="hero-content">
            <h1 className="hero-title">Join Our Travel Community</h1>
            <p className="hero-subtitle">Share your adventures and get inspired by globetrotters worldwide</p>
            <button className="hero-cta" onClick={() => nav('/user/journal')}>Share Your Story</button>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading travel stories...</p>
          </div>
        ) : (
          <>
            <div className="blogs-section">
              
              {users.map((user,index)=>(
                <div key={index} className="blog-card">
                  <div className="blog-header">
                    <div className="profile-info">
                      <div className="profile-pic" style={{ backgroundImage: `url(${user?.userImage})` }}></div>
                      <div className="profile-details">
                        <div className="username">{user?.userId?.name}</div>
                        <div className="username">{user?.userId?.email}</div>
                        
                          <span className="location-icon">📍</span>
                          {user?.address}
                      </div>
                    </div>
                    
                  </div>

                  <div className="blog-footer">
                    <div className="blog-actions">
                      <button 
                        className="action-btn view-gallery view-blog btn-primary"
                        onClick={() => openStoryModal(user)}
                      >
                        <span className="btn-icon">📖</span> Read Story
                      </button>
                      <button 
                        className="action-btn view-gallery"
                        onClick={() => openGalleryModal(user)}
                      >
                        <span className="btn-icon">🖼️</span> View Gallery
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="top-profiles-section table-responsive">
              <h3 className="section-title">
                <span className="title-icon">🌟</span> Top Travelers to Follow
              </h3>
              <div className="profiles-carousel">
                {topProfiles.map(profile => (
                  <div key={profile.id} className="profile-card">
                    <div
                      className="profile-pic-large"
                      style={{ backgroundImage: `url(${profile.profilePic})` }}
                    ></div>
                    <div className="profile-info">
                      <div className="username">{profile.username}</div>
                      <div className="location">
                        <span className="location-icon">🌍</span>
                        {profile.location}
                      </div>
                      <div className="followers">
                        👥 {profile.followers.toLocaleString()} followers
                      </div>
                    </div>
                    <button
                      className={`follow-btn ${profile.isFollowing ? 'following' : ''}`}
                      onClick={() => handleFollow(profile.username, profile.id)}
                    >
                      {profile.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="more-blogs-section">
              <h3 className="section-title">
                <span className="title-icon">🌎</span> More Travel Stories
              </h3>
              <div className="more-blogs-grid">
                {journals?.map(blog => (
                  <div key={`more-${blog._id}`} className="blog-card-small">
                    <div className="blog-header-small">
                      {/* <div
                        className="profile-pic-small"
                        style={{ backgroundImage: `url(${blog.profilePic})` }}
                      ></div> */}
                      <div className="username-small">{blog.username}</div>
                    </div>
                    <div className="blog-footer-small">
                      <h4 className="blog-title-small">{blog.title}</h4>
                      <button 
                        className="action-btn-small"
                        onClick={() => openStoryModal(blog)}
                      >
                        View Story →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="load-more-btn"
                onClick={fetchMoreBlogs}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More Stories'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Community;
