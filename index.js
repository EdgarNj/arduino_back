
import express from 'express';
const app = express(); // Create an Express application

const PORT = 3000; // Define the port your server will listen on

// Middleware to parse JSON data in requests
app.use(express.json());

// Basic route
app.get('/on', (req, res) => {
    res.send('Welcome to my simple Express server!');
});

// Route with a parameter
app.get('/off', (req, res) => {
    const { name } = req.params;
    res.send(`Hello, ${name}!`);
});

// POST route example
app.post('/data', (req, res) => {
    const { message } = req.body;
    res.json({ receivedMessage: message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
