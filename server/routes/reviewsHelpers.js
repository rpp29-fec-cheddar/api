const axios = require('axios');
const config = require('../../config.js');

const getReviews = (productId, sortOption) => {
  sortOption = sortOption || 'relevant';
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}&sort=${sortOption}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': config.TOKEN
      }
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject('ERROR in getReviews: ', err);
      })
  });
}

const getMetaData = (productId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
      headers: {
        'User-Agent': 'request',
        'Authorization': config.TOKEN
      }
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((err) => {
        reject('ERROR in getCharacteristics: ', err);
      })
  });
}

const filterMetaData = (metaData) => {
  return new Promise((resolve, reject) => {
    let filtered = {};

    //format ratings
    let ratings = {};
    for (let rate in metaData.ratings) {
      ratings[rate] = Number(metaData.ratings[rate])
    }

    //format recommended
    let recommended = {};
    for (let rec in metaData.recommended) {
      recommended[rec] = Number(metaData.recommended[rec]);
    }

    //format characteristics
    let characteristics = {}
    for (let key in metaData.characteristics) {
      let value = Number(metaData.characteristics[key].value)
      let fixedValue = Number((value).toFixed(1))
      characteristics[key] = fixedValue;
    }

    filtered['ratings'] = ratings;
    filtered['recommended'] = recommended;
    filtered['characteristics'] = characteristics;

    resolve(filtered);
  });
}


module.exports = {
  getReviews,
  getMetaData,
  filterMetaData
}


