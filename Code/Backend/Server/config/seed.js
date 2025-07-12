const commonModel = require("../api/common/commonModel")
const bcryptjs = require("bcryptjs")

        commonModel.findOne({email:"admin@gmail.com"})
        .then(async (commonData)=>{
            if(!commonData){
               let commonTotal= await commonModel.countDocuments().exec()
                let commonObj=new commonModel()
                commonObj.autoId = commonTotal+1
                commonObj.name= "admin" 
                commonObj.email="admin@gmail.com" 
                commonObj.password=bcryptjs.hashSync("admin",10) 
                commonObj.userType = 1
                commonObj.save()
                .then((commonData)=>{
                    console.log("Admin seeded successfully")
                })
                .catch((err)=>{
                    console.log("Error while seeding admin", err);
                })
            }
            else{
                console.log("Admin already exists !!")   
            }
        })
        .catch((err)=>{
            console.log("Error while seeding admin",err);
        })