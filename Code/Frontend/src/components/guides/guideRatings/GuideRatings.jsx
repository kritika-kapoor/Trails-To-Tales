import React, { useEffect, useState } from 'react';
import './GuideRatings.css';
import apiServices from '../../Services/apiServices';

const GuideRatings = () => {
  const [guide,setGuide]=useState([])
  const [review,setReview] = useState([])

  let formData = {
    userId:sessionStorage.getItem("Id")
  }

  const fetchGuide=()=>{
    apiServices.allGuidesForProfile(formData)
    .then(async(res)=>{
      if(res.data.success){      
        console.log(res.data.guideData[0]);
        setGuide(res.data.guideData[0])
      }
      else{
        console.log(res.data.message)
      }
    })
    .catch((err=>{
      console.log(err.message)
    }))
  }

  const fetchReviews = ()=>{
    let ratingFormData={
      guideId:guide?._id
    }

    apiServices.allRatings(ratingFormData)
    .then(async(res)=>{
      if(res.data.success){      
        console.log(res.data.data);
        setReview(res.data.data)
        
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
    if(guide?._id){
      fetchReviews()
    }
  },[guide?._id])

   useEffect(()=>{
          fetchGuide();
      },[])
    

  // const [reviews] = useState([
  //   {
  //     id: 1,
  //     userName: 'TravelLover22',
  //     userPic: 'https://randomuser.me/api/portraits/women/44.jpg',
  //     rating: 5,
  //     review: 'Our guide was absolutely fantastic! Knew all the hidden gems and made our trip unforgettable. Would definitely book again!',
  //     date: '2023-05-15'
  //   },
  //   {
  //     id: 2,
  //     userName: 'AdventureSeeker',
  //     userPic: 'https://randomuser.me/api/portraits/men/32.jpg',
  //     rating: 4,
  //     review: 'Great knowledge of local history. The tour was a bit rushed at times but overall a wonderful experience.',
  //     date: '2023-04-28'
  //   },
  //   {
  //     id: 3,
  //     userName: 'WanderlustFamily',
  //     userPic: 'https://randomuser.me/api/portraits/women/63.jpg',
  //     rating: 5,
  //     review: 'Perfect for families! Our kids loved the interactive elements and we appreciated the depth of knowledge.',
  //     date: '2023-04-10'
  //   },
  //   {
  //     id: 4,
  //     userName: 'SoloExplorer',
  //     userPic: 'https://randomuser.me/api/portraits/men/75.jpg',
  //     rating: 3,
  //     review: 'Guide was knowledgeable but the group size was larger than expected which made it hard to hear at times.',
  //     date: '2023-03-22'
  //   },
  //   {
  //     id: 5,
  //     userName: 'CultureEnthusiast',
  //     userPic: 'https://randomuser.me/api/portraits/women/28.jpg',
  //     rating: 5,
  //     review: 'Exceptional cultural insights! Went above and beyond to answer all our questions. 10/10 would recommend!',
  //     date: '2023-03-15'
  //   }
  // ]);

  return (
    <div className="ratings-container">
      <div className="ratings-header">
        <div className="header-content">
          <div className="title">Guide Ratings & Reviews</div>
          <div className="subtitle">What travelers are saying about your tours</div>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-value">{guide?.rating}</div>
          <div className="stat-label">Average Rating</div>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`star ${i < 4 ? 'filled' : i === 4 ? 'half-filled' : ''}`}>★</div>
            ))}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{review.length}</div>
          <div className="stat-label">Total Reviews</div>
        </div>
      </div>

      <div className="reviews-section">
        <div className="section-title">Reviews</div>
        
        <div className="reviews-grid">
          {review .map((review,index) => (
            <div key={index} className="review-card">
              <div className="user-info">
                <div 
                  className="user-pic text-cener fs-2 " 
                  
                >
                  <i key={index} className='bi bi-person d-block ms-2'/>
                </div>
                <div className="user-details">
                  <div className="user-name">{review.addedById.name}</div>
                  <div className="review-date">{review.date}</div>
                </div>
              </div>
              
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</div>
                ))}
              </div>
              
              <div className="review-text">{review.review}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default GuideRatings;    