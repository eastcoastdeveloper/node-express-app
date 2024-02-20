const express = require('express');
const router = express.Router();

let countryData = {};
let payload = [];

// POST DATA FROM TABLE ROW CLICK
router.post('/', (req, res) => {
  payload = req.body.payload;
  countryData = req.body.countryData;
  res.redirect(`/details/${countryData.name}`);
});

router.get('/:name', (req, res) => {
  res.render('pages/details', {
    countryData: countryData,
    payload: payload,
  });
});

module.exports = router;
