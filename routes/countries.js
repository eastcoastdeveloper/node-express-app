const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res, next) => {
  res.render('pages/countries');
});

router.get('/:num', (req, res) => {
  const { num } = req.params;
  const data = fs.readFileSync(path.resolve(__dirname, "../rest-countries.json"));
  const result = JSON.parse(data);
  const requestedPg = result.slice(num * 15 - 15, num * 15)
  const length = result.length;
  res.json({ pageNum: requestedPg, length: length })
})

module.exports = router;
