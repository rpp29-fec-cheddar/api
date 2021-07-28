const express = require('express');
const router = express();
const rev = require('./reviewsHelpers');


router.get('/reviews', (req, res) => {
  let productId = req.query.id;
  rev.getReviews(productId)
    .then((product) => {
      res.send(product.results);
    })
    .catch((err) => {
      console.log('Err: ', err);
    })
})

// router.get('/reviews', (req, res) => {
//   //use rev.getReviews(productId)
//     //then use rev.getRecPercentage
//       //then send reviews and percentage here
// })

router.get('/meta', (req, res) => {
  let productId = req.query.id;
  rev.getMetaData(productId)
    .then((data) => {
      return rev.filterMetaData(data)
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log('ERROR in /meta router: ', err)
    })
})


module.exports = router;