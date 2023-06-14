const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const beras = require('./food/beras');
const daging = require('./food/daging');
const minyak = require('./food/minyak');
const mobil = require('./transportation/mobil');
const bus = require('./transportation/bus');
const motor = require('./transportation/motor');

app.use('/predict-beras', beras);
app.use('/predict-daging', daging);
app.use('/predict-minyak', minyak);
app.use('/predict-mobil', mobil);
app.use('/predict-bus', bus);
app.use('/predict-motor', motor);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
