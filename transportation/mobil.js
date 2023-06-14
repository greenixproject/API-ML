const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let model;
const MODEL_PATH = 'https://storage.googleapis.com/model_ready/model_activity/transportation_greenix/mobil/model_mobil.json';

async function loadModel() {
    try {
        model = await tf.loadLayersModel(MODEL_PATH);
        console.log('Model loaded successfully.');
    } catch (error) {
        console.error('Failed to load the model:', error);
    }
}

loadModel();

router.post('/', (req, res) => {
    const { distance } = req.body;

    // Do prediction
    let prediction;
    try {
        const inputData = tf.tensor2d([[distance]]);
        prediction = model.predict(inputData).arraySync()[0];
    } catch (error) {
        console.error('Failed to make prediction:', error);
        prediction = null; // Set prediction to null if an error occurs
    }

    res.send({
        error: false,
        message: 'Predict Success',
        predictResult: prediction
    });
});

module.exports = router;
