require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
    res.send('Welcome to AI Tutoring Platform!');
});

app.get('/ai-tutor', async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: 'Explain the Pythagorean theorem',
            max_tokens: 100,
        });
        res.json(response.data.choices[0].text);
    } catch (error) {
        console.error('Error making API request:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
