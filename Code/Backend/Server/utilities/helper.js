const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dxko3kiry', 
    api_key: '833123637529875',      
    api_secret: 'CS3Raqb6Ahh8zzlarW5GHSgYQKA' 
  });

const uploadImg = (fileBuffer, publicId) => {    
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { publicId },
            (error, uploadResult) => {
                if (error) {
                    return reject({ error: "Upload failed", details: error });
                }
                else{
                    resolve(uploadResult.secure_url);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};


module.exports = {
    uploadImg
};
