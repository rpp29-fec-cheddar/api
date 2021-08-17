const express = require('express');
const router = express();
const rev = require('./reviewsHelpers');

router.put('/helpful', (req, res) => {
  let reviewId = req.body.revId;
  rev.addHelpfulVote(reviewId)
    .then((data) => {
      res.sendStatus(data)
    })
    .catch((err) => {
      console.log('ERROR in /helpful router: ', err)
    })
});

router.post('/addReview', (req, res) => {
  console.log('BODY: ', req.body)
})

module.exports = router;