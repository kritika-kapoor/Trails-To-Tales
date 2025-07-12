import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ManageDestination.css';
import apiServices from '../../../Services/apiServices';
import { Modal } from 'bootstrap';

const ManageDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [load, setLoad] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', destinationImage: null });
  const [previewEditImage, setPreviewEditImage] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [newDestination, setNewDestination] = useState({ name: '', image: null });
  const [previewAddImage, setPreviewAddImage] = useState(null);
  const fileInputRef = useRef(null);
  const addFileInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    fetchDestination();
  }, []);

  const fetchDestination = () => {
    apiServices.allDestinations({status:true})
      .then((res) => {
        if (res.data.success) {
          setDestinations(res.data.destinationData);
          setTimeout(() => {
            setLoad(false);
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleEditClick = (destination, id) => {
    setEditingId(id);
    setEditForm({
      name: destination.destinationName || destination.name,
      destinationImage: null
    });
    setPreviewEditImage(destination.destinationImage || null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm(prev => ({ ...prev, destinationImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async (id) => {
    try {
      const formData = new FormData();
      formData.append('destinationName', editForm.name);
      if (editForm.destinationImage) {
        formData.append('destinationImage', editForm.destinationImage);
      }

      const response = await apiServices.updateDestination(id, formData);

      if (response.data.success) {
        fetchDestination();
        setEditingId(null);
        toast.success('Changes saved successfully!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAdd = () => {
    setAddModal(true);
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: 'static',
      keyboard: false
    });
    bsModal.show();
  };

  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDestination(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAddImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAddFileInput = () => {
    addFileInputRef.current.click();
  };

  const handleAddDestination = async () => {
    try {
      if (!newDestination.name.trim()) {
        toast.error('Destination name is required');
        return;
      }

      const formData = new FormData();
      formData.append('destinationName', newDestination.name);
      if (newDestination.image) {
        formData.append('destinationImage', newDestination.image);
      }

      const response = await apiServices.addDestination(formData);

      if (response.data.success) {
        fetchDestination();
        setNewDestination({ name: '', image: null });
        setPreviewAddImage(null);
        const modal = Modal.getInstance(modalRef.current);
        modal.hide();
        toast.success('Destination added successfully!');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleModalClose = () => {
    setNewDestination({ name: '', image: null });
    setPreviewAddImage(null);
    const modal = Modal.getInstance(modalRef.current);
    modal.hide();
  };

  return (
    <div className="md-container d-flex flex-column pb-5">
      <ToastContainer />
      <div className="md-header">
        <div className="md-title text-light">Manage Destinations</div>
      </div>

      {load ? (
        <div>Loading...</div>
      ) : (
        <div className="md-grid">
          {destinations.map((destination) => (
            <div key={destination._id} className="md-card">
              {editingId === destination._id ? (
                <div className="md-edit-form">
                  <div className="md-form-group">
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="md-form-control"
                    />
                  </div>
                  <div className="md-form-group">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="md-file-input"
                      style={{ display: 'none' }}
                    />
                    <button 
                      onClick={triggerFileInput}
                      className="md-upload-btn"
                    >
                      {previewEditImage ? 'Change Image' : 'Upload Image'}
                    </button>
                    {previewEditImage && (
                      <div className="md-image-preview">
                        <img src={previewEditImage} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="md-content">
                  {destination.destinationImage ? (
                    <div className="md-image-container">
                      <img src={destination.destinationImage} alt={destination.destinationName || destination.name} className="md-image" />
                    </div>
                  ) : (
                    <div className="md-image-container md-placeholder">
                      No Image Uploaded
                    </div>
                  )}
                  <div className="md-name">{destination.destinationName || destination.name}</div>
                </div>
              )}

            
            </div>
          ))}
        </div>
      )}

      <button onClick={handleAdd} className='btn btn-success align-self-end mt-4'>Add New Destination</button>

      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Destination</h5>
              <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="destinationName" className="form-label">Destination Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="destinationName"
                  value={newDestination.name}
                  onChange={(e) => setNewDestination({...newDestination, name: e.target.value})}
                  placeholder="Enter destination name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Destination Image</label>
                <input
                  type="file"
                  ref={addFileInputRef}
                  onChange={handleAddImageChange}
                  accept="image/*"
                  className="form-control d-none"
                />
                <button 
                  onClick={triggerAddFileInput}
                  className="btn btn-secondary w-100"
                >
                  {previewAddImage ? 'Change Image' : 'Upload Image'}
                </button>
                {previewAddImage && (
                  <div className="mt-3 text-center">
                    <img src={previewAddImage} alt="Preview" className="img-thumbnail" style={{maxHeight: '150px'}} />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleAddDestination}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDestination;