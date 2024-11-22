const express = require('express');

const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.static('public'));

// Add proxy endpoint
app.get('/api/latest', async (req, res) => {
    const apiKey = process.env.API_KEY;
    const apiUsername = process.env.API_USERNAME;
    
    if (!apiKey || !apiUsername) {
        return res.status(500).json({ error: 'Missing API credentials' });
    }

    try {
        const response = await axios.get('https://aurovillenetwork.org/latest.json', {
            headers: {
                'Api-Key': apiKey,
                'Api-Username': apiUsername
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});