import React, { useEffect, useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import apiServices from "../Services/apiServices";

const GuidesBooking = () => {
  const [guideData, setGuideData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = () => {
    let formData = {
      _id: id,
    };
    apiServices
      .allGuidesForProfile(formData)
      .then((res) => {
        if (res.data.success) {
          setGuideData(res.data.guideData[0]);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [days, setDays] = useState(0);
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Rating modal state
  const [showRatingModal, setShowRatingModal] = useState(false);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleOpenModal = (selectedGuide) => {
    setSelectedGuide(selectedGuide);
    setShowModal(true);
  };

  const handleOpenRatingModal = () => {
    setShowRatingModal(true);
  };

  const navigate = useNavigate();

  const addBooking = () => {
    let formData = {
      guideId: id,
      destinationId: guideData?.destinationId._id,
      dateOfBooking: selectedDate,
      numberOfDays: Number(days),
    };
    apiServices
      .addBooking(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Booking confirmed successfully! 🎉");
          setShowModal(false);
          navigate("/user/guides");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleConfirmBooking = () => {
    addBooking();
  };

  const handleSubmitRating = () => {
    // Here you would typically call an API to submit the rating and review
    let formData = {
      guideId: id,
      addedRating: rating,
      review: review,
    };
    
    apiServices.addRatings(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Rating submitted successfully!");
          setShowRatingModal(false);
          setRating();
          setReview("");
          // Refresh guide data to show updated rating
          fetchGuides();
        } 
        else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="container pb-5 pt-5 d-flex flex-column align-items-center">
      {/* Main Guide Card */}
      <Card
        className="shadow p-4 mb-4 bg-white rounded"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="d-flex align-items-center">
          <Card.Img
            variant="top"
            src={guideData?.guideImage}
            style={{
              height: "80px",
              width: "80px",
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: "15px",
            }}
          />
          <Card.Body>
            <Card.Title>{guideData?.userId?.name}</Card.Title>
            <Card.Text>
              <strong>Destination:</strong> {guideData.destinationId?.destinationName}
              <br />
              <strong>Cost per Day:</strong> ${guideData?.amountPerDay}
              <br />
              <strong>Contact:</strong> {guideData?.phoneNumber}
              <br />
              <strong>Rating:</strong> ⭐{guideData?.rating}
            </Card.Text>
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={() => handleOpenModal(guideData)}>
                Book Now
              </Button>
              <Button variant="warning" onClick={handleOpenRatingModal}>
                Add Rating
              </Button>
            </div>
          </Card.Body>
        </div>
      </Card>

      {/* Booking Modal */}
      {selectedGuide && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Book {guideData?.userId?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={guideData?.guideImage}
              alt={guideData?.userId?.name}
              className="img-fluid rounded mb-3"
            />
            <p>
              <strong>Destination:</strong> {guideData.destinationId?.destinationName}
            </p>
            <p>
              <strong>Cost per Day:</strong> ${guideData?.amountPerDay}
            </p>

            <h6>Enter Date:</h6>
            <input
              className="form-control"
              required
              type="text"
              value={selectedDate}
              placeholder="dd/mm/yyyy format"
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <h6 className="mt-3">Number of Days:</h6>
            <input
              className="form-control"
              required
              type="number"
              min={0}
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Rating Modal */}
      <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate {guideData?.userId?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: "pointer",
                    fontSize: "2rem",
                    color: star <= rating ? "#ffc107" : "#e4e5e9",
                  }}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="mt-2">Selected Rating: {rating} star(s)</p>
          </div>
          
          <Form.Group controlId="reviewTextarea">
            <Form.Label>Your Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this guide..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRatingModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitRating}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Additional CSS for star rating */}
      <style>
        {`
          .star-rating {
            display: inline-block;
            direction: rtl;
          }
          .star-rating span:hover,
          .star-rating span:hover ~ span {
            color: #ffc107;
          }
        `}
      </style>
    </div>
  );
};

export default function App() {
  return <GuidesBooking />;
}