var axios = require('axios');

module.exports = {
  axiosInstance: axios.create({
    baseURL: 'http://localhost:3000/',
    /* other custom settings */
  }),
};