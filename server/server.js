const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  // Ensure express can parse JSON bodies

// Log to ensure the API key is being read correctly
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runGeminiPro(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }

app.post('/api/gemini', async (req, res) => {
    try {
        const { input } = req.body;
        console.log("Input received:", input);

        const answer = await runGeminiPro(input);
        res.json({ answer: response.data.content });
    } catch (error) {
        console.error('Error in Gemini API call:', error);
        res.status(500).json({ error: 'Error retrieving response from Gemini', details: error.message });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

