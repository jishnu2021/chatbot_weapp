const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

const app = express();
const route = require('./Routes/route');
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGODB_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB', err));

app.get('/hello', (req, res) => {
    res.send('Welcome to the Blog Management API!');
});

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5001/chat', { message: req.body.message });
        res.json({ reply: response.data.reply });
    } catch (error) {
        console.error("Error calling AI server:", error);
        res.status(500).json({ reply: "AI service is unavailable" });
    }
});

app.use('/', route);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
