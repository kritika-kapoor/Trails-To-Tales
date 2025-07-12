import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/user/Home';
import UserMaster from './components/layouts/UserMaster';
import About from './components/user/About';
import Contact from './components/user/Contact';
import Login from './components/auth/Login/Login';
import { ToastContainer } from 'react-toastify'
import AdminMaster from './components/admin/admin layouts/AdminMaster';
import Dashboard from './components/admin/admin pages/Dashboard';
import Guest from './components/guest/Guest';
import GuestMaster from './components/guest/GuestMaster';
import GuestContact from './components/guest/guestContact';
import GuestAbout from './components/guest/GuestAbout';
import ManageUsers from './components/admin/admin pages/ManageUsers';
import ManageGuides from './components/admin/admin pages/ManageGuides';
import ManageAds from './components/admin/admin pages/ManageAds';
import ManageDestination from './components/admin/admin pages/manageDestinations/ManageDestination';
import Guides from './components/user/Guides';
import GuidesBooking from './components/user/GuidesBooking';
import GuideMaster from './components/guides/guide layouts/GuideMaster';
import Guide from './components/guides/guide pages/Guide/Guide';
import GuideAdRequest from './components/guides/guide pages/guideAdRequest/GuideAdRequest';
import GuideContact from './components/guides/guide pages/GuideContact';
import ViewUsers from './components/admin/admin pages/ViewUsers';
import RegisterOptions from './components/auth/Register/RegisterOptions';
import RegisterUser from './components/auth/Register/RegisterUser';
import RegisterGuide from './components/auth/Register/RegisterGuide';
import ViewGuides from './components/admin/admin pages/ViewGuides';
import GuideViewProfile from './components/guides/guide pages/guideProfile/GuideViewProfile';
import Planner from './components/user/Planner/planner';
import Journal from './components/user/Journal/Journal';
import Gallery from './components/user/Gallery/Gallery';
import UserViewProfile from './components/user/UserProfile/UserViewProfile';
import GuestDestinations from './components/guest/guestDestinations/GuestDestinations';
import GuestCommunity from './components/guest/guestCommunity/GuestCommunity';
import GuideRatings from './components/guides/guideRatings/GuideRatings';
import Community from './components/user/community/Community';
import ChangePassword from './components/user/changePassword/ChangePassword';
import GuideChangePassword from './components/guides/guide pages/guideChangePassword/GuideChangePassword';
import Error from './components/error/Error';


function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                
                <Route path='/' element={<GuestMaster/>}>
                    <Route path='/' element={<Guest/>}/>
                    <Route path='/guestabout' element={<GuestAbout/>}/>
                    <Route path='/guestcontact' element={<GuestContact/>}/>
                    <Route path='/guestdestination' element={<GuestDestinations/>}/>
                    <Route path='/guestcommunity' element={<GuestCommunity/>}/>
                </Route>

                
                  <Route path='/admin' element={<AdminMaster/>}>
                      <Route path='/admin' element={<Dashboard/>}/>
                      <Route path='/admin/manageUsers' element={<ManageUsers/>}/>
                      <Route path='/admin/manageGuides' element={<ManageGuides/>}/>
                      <Route path='/admin/manageAds' element={<ManageAds/>}/>
                      <Route path='/admin/manageDestination' element={<ManageDestination/>}/>
                      <Route path='/admin/viewUser/:id' element={<ViewUsers/>}/>
                      <Route path='/admin/viewGuide/:id' element={<ViewGuides/>}/>
                  </Route>

                  <Route path='/user' element={<UserMaster/>}>
                      <Route path='/user' element={<Home/>}/>
                      <Route path='/user/about' element={<About/>}/>
                      <Route path='/user/contact' element={<Contact/>}/>                     
                      <Route path='/user/guides' element={<Guides/>}/>                     
                      <Route path='/user/guidesbooking/:id' element={<GuidesBooking/>}/>                     
                      <Route path='/user/planner' element={<Planner/>}/>                     
                      <Route path='/user/journal' element={<Journal/>}/>                     
                      <Route path='/user/gallery' element={<Gallery/>}/>                     
                      <Route path='/user/profile' element={<UserViewProfile/>}/>                     
                      <Route path='/user/community' element={<Community/>}/>                     
                      <Route path='/user/changePassword' element={<ChangePassword/>}/>                     
                  </Route>

                  <Route path='/guide' element={<GuideMaster/>}>
                        <Route path='/guide' element={<Guide/>}/>
                        <Route path='/guide/guideadrequest' element={<GuideAdRequest/>}/>
                        <Route path='/guide/guidecontact' element={<GuideContact/>}/>
                        <Route path='/guide/profile' element={<GuideViewProfile/>}/>
                        <Route path='/guide/reviews' element={<GuideRatings/>}/>
                        <Route path='/guide/changePassword' element={<GuideChangePassword/>}/>
                  </Route>
                

                  <Route path='/login' element={<Login/>}/>
                  <Route path='/register' element={<RegisterOptions/>}/>
                  <Route path='/register/user' element={<RegisterUser/>}/>
                  <Route path='/register/guide' element={<RegisterGuide/>}/>

                  <Route path='/*' element={<Error/>}/>
                  
              </Routes>

          </BrowserRouter>
          <ToastContainer theme='colored' autoClose={1500}/>
      </>
  )
}

export default App
