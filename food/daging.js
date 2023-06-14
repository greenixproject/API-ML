const express = require('express');
const tf = require('@tensorflow/tfjs-node');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let model;
const MODEL_PATH = 'https://storage.googleapis.com/model_ready/model_activity/food_greenix/daging/model_daging.json';

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

app.post('/predict-daging', (req, res) => {
    const { num_people, consumption } = req.body;

    // Do prediction
    let prediction;
    try {
        const inputData = tf.tensor2d([[num_people, consumption]]);
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
