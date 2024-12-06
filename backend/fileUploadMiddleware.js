const axios = require('axios');
const cloudinary = require('cloudinary');


module.exports = function fileUploadMiddleware(req, res) {

  cloudinary.config({
    cloud_name: 'dchqfwweu',
    api_key: '188987548856971',
    api_secret: 'aMP6EnEAzXu0IS-jtZKoGEoW7zM',
  });  

  
  cloudinary.uploader.upload_stream((result) => {
    axios({
      url: '/api/upload',
      method: 'post',
      data: {
        url: result.secure_url,
        name: req.body.name,
        description: req.body.description,
      },
    })
      .then((response) => {
        res.status(200).json(response.data.data);
      })
      .catch((error) => {
        res.status(500).json(error.response.data);
      });
  }).end(req.file.buffer);
};
