const express = require('express');
const cors = require('cors');
const app = express();
const port = 3333;

// Middleware
app.use(cors());
app.use(express.json());

// Store game results
let gameResults = [];

// GET endpoint to get previous match results
app.get('/api/results', (req, res) => {
    res.json(gameResults);
});

// POST endpoint to save a game result
app.post('/api/result', (req, res) => {
    const { result } = req.body;
    gameResults.push({
        result,
        timestamp: new Date()
    });
    res.json({ message: 'Result saved successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
