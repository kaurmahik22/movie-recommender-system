const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json())

// handles an HTTP GET request and responds with 9 randomly selected movies
app.get('/movies', (req, res) => {
    let results = [];
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const shuffledMovies = results.sort(() => 0.5 - Math.random()).slice(0, 9);
            res.json(shuffledMovies); 
        });
});

// handles an HTTP Post request. makes POST request to Flask API to get recommendations
app.post('/selected-movie', async (req, res) => {
    console.log(req.body)
    try {
        const response = await axios.post('http://127.0.0.1:5000/selected-movie', req.body);
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
       res.status(500).json({ error: 'Error connecting to ML server' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});