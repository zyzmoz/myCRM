const axios = require('axios');

export const getZipCodeInfo = (zipCode) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://viacep.com.br/ws/${zipCode}/json/ `)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}