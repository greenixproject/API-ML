const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let model;
const MODEL_PATH = 'https://storage.googleapis.com/model_ready/model_activity/transportation_greenix/motor/model_motor.json';

async function loadModel() {
    try {
        model = await tf.loadLayersModel(MODEL_PATH);
        console.log('Model loaded successfully.');
    } catch (error) {
        console.error('Failed to load the model:', error);
    }
}

loadModel();

app.get('/', (req, res) => {
    res.send({ hello: 'world' });
});

app.post('/predict-motor', (req, res) => {
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

app.listen(8081, () => {
    console.log('Server running on port 8081');
});
