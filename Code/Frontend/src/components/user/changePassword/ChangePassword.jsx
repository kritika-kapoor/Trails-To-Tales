import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ChangePassword.css';
import apiServices from '../../Services/apiServices';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

  const nav = useNavigate()

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.oldPassword) newErrors.oldPassword = 'Old password is required';
    if (!formData.newPassword) newErrors.newPassword = 'New password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changePassword = ()=>{
    apiServices.changePassword(formData)  
    .then((res)=>{
      if(res.data.success){
        toast.success(res.data.message)
        nav('/user/profile')
      }
      else{
        toast.error(res.data.message)
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

 const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        changePassword()
        // Reset form
        setFormData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
      }, 1000);
      
    }
  };


  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <div className="change-password-header">
          <div className="change-password-title">Change Password</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-label">Old Password</div>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
            />
            {errors.oldPassword && <div className="invalid-feedback">{errors.oldPassword}</div>}
          </div>

          <div className="form-group">
            <div className="form-label">New Password</div>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
            />
            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
          </div>

          <div className="form-group">
            <div className="form-label">Confirm New Password</div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
