
import './GuestDestination.css';

const GuestDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
      description: 'White-washed buildings with blue domes overlooking the Aegean Sea'
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3',
      description: 'Ancient temples and cherry blossoms in the cultural heart of Japan'
    },
    {
      id: 3,
      name: 'Banff, Canada',
      image: 'https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5',
      description: 'Stunning mountain landscapes and turquoise lakes in the Canadian Rockies'
    },
    {
      id: 4,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      description: 'Tropical paradise with lush jungles, beaches, and vibrant culture'
    },
    {
      id: 5,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114',
      description: 'The city of love with iconic landmarks and romantic atmosphere'
    },
    {
      id: 6,
      name: 'Cape Town, South Africa',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      description: 'Where mountains meet oceans with diverse cultures and wildlife'
    }
  ];

  return (
    <div className="destinations-container">
      <div className="destinations-header">
        <div className="destinations-title">Top Travel Destinations</div>
        <div className="destinations-subtitle">Explore the world's most beautiful places</div>
      </div>
      
      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <div className="destination-image">
  <img src={`${destination.image}?w=600&auto=format`} alt={destination.name} />
</div>

            <div className="destination-content">
              <div className="destination-name">{destination.name}</div>
              <div className="destination-description">{destination.description}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="destinations-footer">
        <div className="footer-text">Register to join our community to share your travel experiences!</div>
      </div>
    </div>
  );
};

export default GuestDestinations;