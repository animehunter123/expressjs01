const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods we're using
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
app.use(bodyParser.json());
app.use(express.static('public'));

// Data file path
const dataFile = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
}

// Read data
app.get('/api/items', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    res.json(data);
});

// Add item
app.post('/api/items', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    const newItem = {
        id: Date.now(),
        ...req.body
    };
    data.push(newItem);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.json(newItem);
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    const id = parseInt(req.params.id);
    const newData = data.filter(item => item.id !== id);
    fs.writeFileSync(dataFile, JSON.stringify(newData, null, 2));
    res.json({ message: 'Item deleted' });
});

// Update item
app.put('/api/items/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    const id = parseInt(req.params.id);
    const itemIndex = data.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        data[itemIndex] = { ...data[itemIndex], ...req.body };
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        res.json(data[itemIndex]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
    console.log(`You can also access it via your network IP address on port ${port}`);
});
