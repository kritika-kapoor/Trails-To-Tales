import axios from "axios"
const baseUrl = "http://localhost:5000"

class apiServices{
    login(formData){
        return axios.post(baseUrl+"/api/login", formData)
    }

    register(formData){
        return axios.post(baseUrl+"/api/user/register", formData)
    }

    allUsers(){
         let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl+"/api/all/users",{},headers)
    }

    allUsersProfile(formData){
         let headers = {
        headers:{
            Authorization: sessionStorage.getItem("token")
        }
    }
        return axios.post(baseUrl+"/api/all/users",formData,headers)
    }

    getUser(formData){
         let headers = {
        headers:{
            Authorization: sessionStorage.getItem("token")
        }
    }
        return axios.post(baseUrl+"/api/single/user/:id",formData,headers)
    }


    // Guide Api's

    allGuides(){
         let headers = {
        headers:{
            Authorization: sessionStorage.getItem("token")
        }
    }
        return axios.post(baseUrl+"/api/all/guides",{},headers)
    }

    allGuidesProfile(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl+"/api/all/guides",formData,headers)
    }

    allGuidesForProfile(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl+"/api/all/guides",formData,headers)
    }

    registerGuide(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl+"/guide/register", formData)
    }

    getGuide(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl+"/api/single/guide/:id",formData,headers)
    }

    userChangeStatus(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl+"/api/user/changeStatus",formData,headers)
    }

    guideChangeStatus(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl+"/api/guide/changeStatus",formData,headers)
    }




    // Advertisements

    allAds(){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/all/ads",{},headers)
    }

    allAdsForProfile(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/all/ads",formData,headers)
    }


    addAds(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/guide/add/advertisement",formData,headers)
    }

    adsChangeStatus(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/admin/changeStatus/ads", formData, headers)
    }





    allDestinations(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/all/destination",formData,headers)
    }

    addDestination(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/admin/add/destination",formData,headers)
    }

    updateDestination(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/admin/update/destination",formData,headers)
    }



    // Booking api's
    
    allBookingsForProfile(bookingFormData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/all/booking",bookingFormData,headers)
    }

    addBooking(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/user/add/booking",formData,headers)
    }


    // Reports Api

    allReports(){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/admin/all/reports",{},headers)

    }

    reportsChangeStatus(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/admin/changeStatus/report",formData,headers)
    }


    dashboard(){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/admin/dashboard",{},headers)
    }


    // TO Do api
    addToDo(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/user/add/toDo",formData,headers)
    }

    fetchAllToDo(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/user/all/toDo",formData,headers)
    }

    updateToDo(formData) {
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/user/update/toDo", formData, headers);
    }   


    // Journal Api
    addJournal(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/user/add/journal", formData, headers);
    }

    allJournal(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/all/journal", formData, headers);
    }


    // Ratings api
    allRatings(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/all/ratings", formData, headers);
    }

    addRatings(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/user/add/ratings", formData, headers);
    }


    // Gallery Api
    addGallery(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/user/add/gallery", formData, headers);

    }

    allGallery(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/all/gallery", formData, headers)
    }


    // change password
    changePassword(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/changePassword", formData, headers);
    }

    // contact
    fetchContact(formData){
        let headers = {
            headers:{
                Authorization: sessionStorage.getItem("token")
            }
        }
        return axios.post(baseUrl + "/api/contact", formData, headers);

    }


}



export default new apiServices()