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
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Gemini response:", text);
        return text;
    } catch (error) {
        console.error('Error in Gemini API call:', error);
        throw error; 
    }
}

app.post('/api/gemini', async (req, res) => {
    try {
        const { input } = req.body;
        console.log("Input received:", input);

        let prompt = '';
        if (input.includes('Hi') || input.includes('Hello') || input.includes('Hey') || input.includes('Greetings') || input.includes('Good morning') || input.includes('Good afternoon') || input.includes('Good evening)') || input.includes('Good night)') || input.includes('Good day)')) {
            prompt +=  'You are a leetcode assistant introduce yourself';
        } else if (input.includes('give me the answer') || input.includes('give me the code') || input.includes('give me the solution') || input.includes('give me the code answer') || input.includes('give me the code solution') || input.includes('give me the solution code') || input.includes('give me the answer code') || input.includes('give me the code answer solution') || input.includes('give me the code solution answer') || input.includes('give me the solution code answer') || input.includes('give me the solution answer code') || input.includes('give me the answer code solution') || input.includes('give me the answer solution code')) {
            prompt += 'Give the coding answer to the question in the language they specified, if not give python';
        } else if (input.includes('need help') || input.includes('are stuck') || input.includes('help me') || input.includes('stuck') || input.includes('need help with a question') || input.includes('need help with a dsa question') || input.includes('need help with a coding question') || input.includes('need help with a leetcode question') || input.includes('need help with a question on leetcode') || input.includes('need help with a dsa question on leetcode') || input.includes('need help with a coding question on leetcode')){
            prompt += 'If someone says they need help or are stuck guide them through the question and explain the topic. Give one hint at a time when someone tells you they are stuck.';
        } else if (input.includes('confused') || input.includes('unfamiliar with a dsa topic')) {
            prompt = 'Provide explanations to topics if someone is confused or is unfamiliar with a dsa topic (DONT GIVE CODING ANSWER)';
        } else if (input.includes('interview coming up') || input.includes('interview prep') || input.includes('interview practice') || input.includes('interview questions') || input.includes('interview study plan') || input.includes('interview study guide') || input.includes('interview study schedule') || input.includes('interview study planner') || input.includes('interview study timetable') || input.includes('interview study calendar')){
            prompt = 'Give study plan if someone has a interview coming up based on time they have until.';
        } else if (input.includes('more practice for a question on leetcode') || input.includes('more practice for a question') || input.includes('more practice for a coding question') || input.includes('more practice for a dsa question') || input.includes('more practice for a question on leetcode') || input.includes('more practice for a question') || input.includes('more practice for a coding question') || input.includes('more practice for a dsa question') || input.includes('more practice for a question on leetcode') || input.includes('more practice for a question') || input.includes('more practice for a coding question') || input.includes('more practice for a dsa question') || input.includes('more practice for a question on leetcode') || input.includes('more practice for a question') || input.includes('more practice for a coding question') || input.includes('more practice for a dsa question')){
            prompt = 'Provide similar questions to the one the user is talking about when someone wants more practice for a question on leetcode.';
        }

        const answer = await runGeminiPro(input);
        res.json({ answer });
    } catch (error) {
        console.error('Error in API call:', error);
        res.status(500).json({ error: 'Error retrieving response from Gemini', details: error.message });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});