import { useNavigate } from 'react-router-dom';
import './Guide.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Guide() {
  const navigate = useNavigate();

  return (
    <div className="guide-wrapper">
      <div className="guide-card-container text-center p-4">
        <div className="guide-title mb-2">Welcome Guide</div>
        <div className="guide-subtitle mb-5">Welcome to Trails to Tales – Your adventure begins here!</div>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
          <div className="guide-feature-card bg-light">
            <div>

            <div className="guide-icon">🌍</div>
            <div className="feature-title">View Your <br/>Reviews</div>
            <div className="feature-text">Check your current ratings easily.</div>
            </div>
            <button className="btn btn-primary mt-3 rounded-pill px-4 service-btn" onClick={() => navigate('/guide/reviews')}>
              Go to Reviews
            </button>
          </div>

          <div className="guide-feature-card bg-light">
            <div>

            <div className="guide-icon">📢</div>
            <div className="feature-title">Request for Advertisement</div>
            <div className="feature-text">Promote your offerings to a wider audience.</div>
            </div>
            <button className="btn btn-primary mt-3 rounded-pill px-4 ad-btn" onClick={() => navigate('/guide/guideadrequest')}>
              Request Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
