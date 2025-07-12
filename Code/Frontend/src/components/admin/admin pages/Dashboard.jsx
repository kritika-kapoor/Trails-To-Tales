import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import apiServices from '../../Services/apiServices';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [dash,setDash]= useState([])
    const nav = useNavigate()

    const fetchDash=()=>{
         apiServices.dashboard()
                    .then((res)=>{          
                        if(res.data.success){
                            setDash(res.data)
                            console.log(res.data);
                            
                            
                        }else{
                            toast.error(res.data.message)
                        }
                    })  
                    .catch((err)=>{
                        toast.error(err.message)
                    })  
    }

    useEffect(()=>{
            fetchDash()
        },[])
  return (
    <div className="dashboard-container text-center">
      <div className="dashboard-header">
        <div className="dashboard-title">Admin Dashboard</div>
        <div className="dashboard-subtitle">Travel Community Overview</div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{dash?.userData?.TotalUsers}</div>
          <div className="stat-label">Total Users</div>
          <div className="stat-icon">👥</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dash?.guideData?.Active}</div>
          <div className="stat-label">Active Guides</div>
          <div className="stat-icon">🧭</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dash?.galleryData?.galleryTotal}</div>
          <div className="stat-label">Gallery Items</div>
          <div className="stat-icon">🖼️</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{dash?.journalData?.journalTotal}</div>
          <div className="stat-label">New Blogs</div>
          <div className="stat-icon">✍️</div>
        </div>
      </div>

      <div className="content-row">
        <div className="content-card wide">
          <div className="card-header">Recent Activities</div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-desc">New user registered (JohnDoe)</div>
              <div className="activity-time">2 mins ago</div>
            </div>
            <div className="activity-item">
              <div className="activity-desc">Guide Sarah posted a new trip</div>
              <div className="activity-time">15 mins ago</div>
            </div>
            <div className="activity-item">
              <div className="activity-desc">Blog "Mountain Hiking" published</div>
              <div className="activity-time">1 hour ago</div>
            </div>
            <div className="activity-item">
              <div className="activity-desc">10 new gallery uploads</div>
              <div className="activity-time">3 hours ago</div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">Quick Actions</div>
          <div className="action-buttons">
            <div className="action-btn" onClick={()=>{nav('/admin/manageDestination')}}>
              <div className="action-icon">✈️</div>
              <div className="action-text">Add New Destination</div>
            </div>
            <div className="action-btn" onClick={()=>{nav('/admin/manageAds')}}>
              <div className="action-icon">📝</div>
              <div className="action-text">Manage Ads</div>
            </div>
            <div className="action-btn" onClick={()=>{nav('/admin/manageGuides')}}>
              <div className="action-icon">👨‍💼</div>
              <div className="action-text">Manage Guides</div>
            </div>
            <div className="action-btn" onClick={()=>{nav('/admin/manageUsers')}}>
              <div className="action-icon">👥</div>
              <div className="action-text">View Users</div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-row">
        <div className="content-card">
          <div className="card-header">Community Growth</div>
          <div className="simple-graph">
            <div className="graph-bar" style={{ height: '40px' }}>Jan: 11</div>
            <div className="graph-bar" style={{ height: '80px' }}>Feb: 18</div>
            <div className="graph-bar" style={{ height: '120px' }}>Mar: 13</div>
            <div className="graph-bar" style={{ height: '100px' }}>Apr: 34</div>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">Content Status</div>
          <div className="status-list">
            <div className="status-item">
              <div className="status-lael">Published Blogs</div>
              <div className="status-value">{dash?.journalData?.journalTotal}</div>
            </div>
            <div className="status-item">
              <div className="status-label">Active Blogs</div>
              <div className="status-value">{dash?.journalData?.journalActiveTotal}</div>
            </div>

            <div className="status-item">
              <div className="status-label">Active Users</div>
              <div className="status-value">{dash?.userData?.Active}</div>
            </div>
            <div className="status-item">
              <div className="status-label">Advertisement Requests Pending</div>
              <div className="status-value">{dash?.advertisementsData?.Active}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;