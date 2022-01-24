const cloudinary = require('cloudinary')
const config = require('../config')

cloudinary.config({
  cloud_name: config?.cloudinary?.name,
  api_key: config?.cloudinary?.api,
  api_secret: config?.cloudinary?.secret
});