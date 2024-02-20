const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const countries = require('./routes/countries.js');
const details = require('./routes/details.js');
const aboutPg = require('./routes/about.js');
const cors = require("cors");

app.use(express.static('public'));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/', countries);
app.use('/details', details);
app.use('/about', aboutPg);

var server = app.listen(3000, function () {
  var host = server.address().address;
  // var port = server.address().port;
  console.log(host);
});
