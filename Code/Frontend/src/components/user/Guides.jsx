import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiServices from "../Services/apiServices";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";


export default function Guides(){
    // useState hooks
    const [search, setSearch] = useState("");
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [guideData, setGuideData] = useState([])
    const [load,setLoad] =useState(true)

    useEffect(()=>{
            fetchGuides()
        },[])
    
        const fetchGuides=()=>{
            let formData = {
                status:true
            }
            apiServices.allGuidesForProfile(formData)
            .then((res)=>{          
                if(res.data.success){                    
                    // toast.success(res.data.message)
                    setGuideData(res.data.guideData)    
                    setInterval(()=>{
                        setLoad(false)
                    },2000)
                }else{
                    toast.error(res.data.message)
                }
            })  
            .catch((err)=>{
                toast.error(err.message)
            })  
        }

    
    const guideDatas = guideData.filter(guideData =>
        guideData?.destinationId?.destinationName.toLowerCase().includes(search.toLowerCase())
    );
    
    // To open modal
    const handleShowModal = (guide) => {
        setSelectedGuide(guide);
        setShowModal(true);
    };
    
    // To close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedGuide(null);
    };
    
    const navigate = useNavigate();
    
    const handleBooking = (guide) => {
        console.log(guide);
        
        navigate(`/user/guidesbooking/${guide._id}`, { state: { guide } }); // Pass guide data
    };
    
    return (
        <>
            {load?
            <div style={{height:"80vh"}}>
            <HashLoader color="blue" style={{display:"block", margin:"auto"}}/>
            </div>
            :
            <div className="container mt-5">
                {/* Search bar */}
                <div className="mb-4 text-center">
                <h2 className="fw-bold text-primary mb-3">Find Your Guide</h2>
                <input
                type="text"
                className="form-control p-3 bg-light shadow-sm border-0 rounded-pill w-50 mx-auto"
                placeholder="Search your destination..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                </div>

                {/* Guide info */}
                <div className="row">
                    {guideDatas.map((guide,index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card p-4 shadow-lg border-0 rounded-4 text-center guide-card" onClick={() => handleShowModal(guide)}>
                        <div className="d-flex flex-column align-items-center">
                            <img src={guide?.guideImage} alt={guide.name} className="rounded-circle mb-3 shadow" width="90" height="90" />
                            <h5 className="fw-semibold mb-1 text-dark">{guide?.userId?.name}</h5>
                            <p className="text-muted small">{guide?.destinationId?.destinationName}</p>
                        </div>
                        <button className="btn btn-primary w-100 mt-3 rounded-pill shadow-sm" onClick={(e) => { e.stopPropagation(); handleBooking(guide); }}>Book Now</button>
                        </div>
                    </div>
                    ))}
                </div>
          
                {/* Modal */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Guide Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {selectedGuide && (
                        <div className="text-center">
                        <img src={selectedGuide.guideImage} alt={selectedGuide.name} className="img-fluid rounded-circle mb-3 shadow" width="100" height="100" />
                        <h4>{selectedGuide.name}</h4>
                        <p className="text-muted">Destination: {selectedGuide?.destinationId?.destinationName}</p>
                        <p>Name: {selectedGuide?.userId?.name}</p>
                        <p>Contact: {selectedGuide?.phoneNumber}</p>
                        <p>Cost per day: ${selectedGuide?.amountPerDay}</p>
                        <p>Rating: {selectedGuide?.rating}⭐</p>
                        </div>
                    )}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={() => handleBooking(selectedGuide)
                    }>Book Now</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            }
            </>
      );
}