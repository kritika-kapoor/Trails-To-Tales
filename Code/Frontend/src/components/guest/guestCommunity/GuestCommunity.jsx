import React, { useState, useEffect } from 'react';
import './GuestCommunity.css';

const GuestCommunity = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [topProfiles, setTopProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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
          isFollowing: false
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

  const promptRegistration = () => {
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <div className="community-container">
      {showRegisterModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <div className="register-modal">
              <div className="modal-icon">🔒</div>
              <h2 className="modal-title">Join Our Community</h2>
              <p className="modal-text">
                Register now to connect with fellow travelers, follow your favorite explorers, 
                and share your own adventures!
              </p>
              <div className="modal-actions">
                <button className="action-btn primary" onClick={() => window.location.href = '/register'}>
                  Register Now
                </button>
                <button className="action-btn secondary" onClick={closeModal}>
                  Maybe Later
                </button>
              </div>
              <p className="modal-footer-text">
                Already have an account? <a href="/login">Log in</a>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="community-content">
        <div className="community-hero">
          <div className="hero-content">
            <h1 className="hero-title">Explore Our Travel Community</h1>
            <p className="hero-subtitle">Discover amazing adventures shared by globetrotters worldwide</p>
            <button className="hero-cta" onClick={promptRegistration}>Share Your Story</button>
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
              {userBlogs.map(blog => (
                <div key={blog.id} className="blog-card">
                  <div className="blog-header">
                    <div className="profile-info">
                      <div className="profile-pic" style={{ backgroundImage: `url(${blog.profilePic})` }}></div>
                      <div className="profile-details">
                        <div className="username">{blog.username}</div>
                        <div className="location">
                          <span className="location-icon">📍</span>
                          {blog.location}
                        </div>
                      </div>
                    </div>
                    <button
                      className={`follow-btn ${blog.isFollowing ? 'following' : ''}`}
                      onClick={promptRegistration}
                    >
                      {blog.isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>

                  <div className="blog-content">
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-text">{blog.content.substring(0, 150)}...</p>
                  </div>

                  <div className="blog-footer">
                    <div className="blog-actions">
                      <button 
                        className="action-btn view-blog"
                        onClick={promptRegistration}
                      >
                        <span className="btn-icon">📖</span> Read Story
                      </button>
                      <button 
                        className="action-btn view-gallery"
                        onClick={promptRegistration}
                      >
                        <span className="btn-icon">🖼️</span> View Gallery
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="top-profiles-section">
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
                      onClick={promptRegistration}
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
                {userBlogs.map(blog => (
                  <div key={`more-${blog.id}`} className="blog-card-small">
                    <div className="blog-header-small">
                      <div
                        className="profile-pic-small"
                        style={{ backgroundImage: `url(${blog.profilePic})` }}
                      ></div>
                      <div className="username-small">{blog.username}</div>
                    </div>
                    <div className="blog-footer-small">
                      <h4 className="blog-title-small">{blog.title}</h4>
                      <button 
                        className="action-btn-small"
                        onClick={promptRegistration}
                      >
                        View Story →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="load-more-btn"
                onClick={promptRegistration}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Join now to expore them all'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GuestCommunity;