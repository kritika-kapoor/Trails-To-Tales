import React, { useEffect, useState } from 'react';
import './ViewProfile.css';
import apiServices from '../../../Services/apiServices';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const GuideViewProfile = () => {
  const [guideId, setGuideId] = useState();
  const [isAd, setIsAd] = useState(false);

  useEffect(() => {
    fetchGuide();
    fetchAd();
    fetchBooking();
  }, []);

  let formData = {
    userId: sessionStorage.getItem("Id")
  };

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    isEditing: false
  });

  const fetchGuide = () => {
    apiServices.allGuidesForProfile(formData)
      .then(async (res) => {
        if (res.data.success) {
          setGuideId(res.data.guideData[0]._id);
          setName(res.data.guideData[0].userId.name);
          setEmail(res.data.guideData[0].userId.email);
          setImage(res.data.guideData[0].guideImage);
          setPhone(res.data.guideData[0].phoneNumber);
          setDestination(res.data.guideData[0].destinationId?.destinationName);
          setAmount(res.data.guideData[0].amountPerDay);

          setProfile({
            name: res.data.guideData[0].userId.name,
            email: res.data.guideData[0].userId.email,
            phone: res.data.guideData[0].phoneNumber
          });
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err => {
        console.log(err.message);
      }));
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState();
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [ads, setAds] = useState([]);

  let singleAdData = {
    addedById: sessionStorage.getItem("Id")
  };

  const fetchAd = () => {
    apiServices.allAdsForProfile(singleAdData)
      .then((res) => {
        if (res.data.success) {
          setIsAd(true);
          setAds(res.data.adsData);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err => {
        console.log(err.message);
      }));
  };

  const [bookings, setBookings] = useState([]);

  const fetchBooking = async () => {
    await apiServices.allBookingsForProfile(bookingFormData)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.message);
          console.log(res);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (guideId) {
      setIsReady(true);
    }
  }, [guideId]);

  useEffect(() => {
    if (!isReady) return;

    const bookingFormData = {
      guideId: guideId
    };

    const fetchBooking = async () => {
      try {
        const res = await apiServices.allBookingsForProfile(bookingFormData);
        if (res.data.success) {
          console.log(res.data.message);
          console.log(res);
          setBookings(res?.data?.bookingData);
        } else {
          console.log(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooking();
  }, [isReady, guideId]);

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Guide Profile</h1>
        <p>Welcome to your Trails to Tales dashboard</p>
      </div>

      <div className="row profile-section">
        <div className="col profile-card">
          <div className="profile-header">
            <div className="profilepicture d-flex justify-content-center mb-2">
              <img src={image} alt="Profile" className="profile-pic" />
            </div>
            <h2>{profile.name}</h2>
          </div>

          <div className="profile-details">
            <div className="detail-group">
              <label>Email</label>
              {profile.isEditing ? (
                <input type="email" name="email" value={profile.email} />
              ) : (
                <div className="detail-value">{profile.email}</div>
              )}
            </div>

            <div className="detail-group">
              <label>Phone</label>
              {profile.isEditing ? (
                <input type="tel" name="phone" value={profile.phone} />
              ) : (
                <div className="detail-value">{profile.phone}</div>
              )}
            </div>

            <div className="profile-actions">
              <Link to={'/guide/changePassword'} className='btn btn-primary text-decoration-none'>Change Password</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="cards-grid">
        <div className="info-card">
          <h3>My Packages</h3>
          <div className="card-content">
            <div key={1} className="package-item">
              <div className="package-line">
                <span className="package-name">Destination: {destination}</span>
              </div>
              <div className="package-line">
                <span className="package-price">Amount Per Day: ${amount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3>Advertisements</h3>
          {isAd && ads.length > 0 ? (
            <div id="adsCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {ads.map((ad, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={ad.adsImage}
                    alt="Ad"
                    className="ad-image d-block img-fluid"
                    style={{ width: '100%', borderRadius: '8px', maxHeight: '250px', objectFit: 'cover' }}
                  />
                  <div className="mt-2">
                    <h5>{ad.adsName}</h5>
                    <p>{ad.description}</p>
                    <p>Duration: {ad.duration} months</p>
                    <p>Cost: ${ad.cost}</p>
                    {ad.status === 0 ? (
                      <span className="badge bg-warning text-light">Pending</span>
                    ) : ad.status === 1 ? (
                      <span className="badge bg-success text-light">Approved</span>
                    ) : (
                      <span className="badge bg-danger text-light">Rejected</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#adsCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" style={{ filter: 'invert(1)' }}></span>
    <span className="visually-hidden">Previous</span>
  </button>

  <button className="carousel-control-next" type="button" data-bs-target="#adsCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" style={{ filter: 'invert(1)' }}></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

          ) : (
            <span>No Ads Posted yet</span>
          )}
        </div>

        <div className="info-card">
          <h3>Current Bookings</h3>
          <div className="card-content">
            {bookings.map((booking, index) => (
              <div key={index} className="booking-item">
                <span className="traveler-name">Booked by : {booking?.userId?.name}</span>
                <span className="booking-package">Destination : {booking?.destinationId?.destinationName}</span>
                <span className="booking-package">Date : {booking?.dateOfBooking}</span>
                <span className="booking-date">No. of days : {booking?.numberOfDays}</span>
                <span className="booking-package">Cost : ${booking?.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideViewProfile;
