import { useState } from 'react';
import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
export default function TestimonialData(){
    
   const testimonials = [
  {
    id: 1,
    name: 'Emily Rivera',
    location: 'Seattle, USA',
    image: '/assets/img/testimonial-1.jpg',
    feedback:
      'Trails to Tales made planning my solo trip to the Pacific Northwest so easy. I loved being able to document each day and share my journal with fellow travelers.',
  },
  {
    id: 2,
    name: 'Karan Mehta',
    location: 'Mumbai, India',
    image: '/assets/img/testimonial-2.jpg',
    feedback:
      'I discovered some amazing hidden treks through the community section. The platform feels more like a travel club than just another website.',
  },
  {
    id: 3,
    name: 'Sophie Dubois',
    location: 'Lyon, France',
    image: '/assets/img/testimonial-3.jpg',
    feedback:
      'What I love most about Trails to Tales is how it combines planning with storytelling. My photo albums have never had such a welcoming audience!',
  },
  {
    id: 4,
    name: 'Liam O’Connor',
    location: 'Dublin, Ireland',
    image: '/assets/img/testimonial-4.jpg',
    feedback:
      'This site helped me stay organized during our backpacking trip across Europe. Plus, uploading memories and reading others’ journals is just inspiring.',
  },
];

      const activeColor = "#9BCB3C"; 
      const arrowColor = "#000000";
    
      const [visibleItems, setVisibleItems] = useState(4);
      const [activeIndex, setActiveIndex] = useState(0);
    
      // Update visible items based on screen width
      const updateVisibleItems = () => {
        if (window.innerWidth < 576) {
          setVisibleItems(1); // Mobile: 1 card
        } else if (window.innerWidth < 992) {
          setVisibleItems(2); // Tablet: 2 cards
        } else {
          setVisibleItems(2); // Desktop: 4 cards
        }
      };
    
      useEffect(() => {
        updateVisibleItems();
        window.addEventListener("resize", updateVisibleItems);
        return () => window.removeEventListener("resize", updateVisibleItems);
      }, []);
    
      // Handle Carousel navigation and track active index
      const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
      };
    
      // Group testimonials based on visibleItems
      const chunkTestimonials = (arr, size) => {
        return arr.reduce((chunks, item, index) => {
          const chunkIndex = Math.floor(index / size);
          if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
          chunks[chunkIndex].push(item);
          return chunks;
        }, []);
      };
    
      const slides = chunkTestimonials(testimonials, visibleItems);
    return(
        <>
        <div className="container my-5">
      <div className="text-center mb-5">
        <h6 className="section-title1 bg-white text-center text-primary px-3">
          Testimonial
        </h6>
        <h1 className="fw-bold">Our Clients Say!!!</h1>
      </div>

      <Carousel
        interval={3000}
        indicators={true}
        onSelect={handleSelect}
        prevIcon={
          <span
            className="carousel-control-prev-icon me-5"
            aria-hidden="true"
            style={{
              filter: `invert(100%) sepia(20%) saturate(500%)`,
              color: arrowColor,
            }}
          />
        }
        nextIcon={
          <span
            className="carousel-control-next-icon ms-5"
            aria-hidden="true"
            style={{
              filter: `invert(100%) sepia(20%) saturate(500%)`,
              color: arrowColor,
            }}
          />
        }
      >
        {slides.map((group, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            <div className="d-flex justify-content-center">
              {group.map((item, idx) => {
                // Calculate the global card index
                const globalIndex = slideIndex * visibleItems + idx;

                return (
                  <div
                    key={item.id}
                    className="text-center border rounded p-4 mx-3"
                    style={{
                      transition: "0.5s",
                      backgroundColor:
                        globalIndex === activeIndex+1 ? "royalblue" : "#F8F9FA",
                      color: globalIndex === activeIndex+1 ? "#FFFFFF" : "#6C757D",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-circle shadow mb-3"
                      style={{ width: "80px", height: "80px" }}
                    />
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1">{item.location}</p>
                    <div className="mb-1">
                      {[...Array(5)].map((_, starIdx) => (
                        <small
                          key={starIdx}
                          className={`fa fa-star ${
                            starIdx < item.rating ? "text-primary" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <p>{item.feedback}</p>
                  </div>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
        </>
    )
}