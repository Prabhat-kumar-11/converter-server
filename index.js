const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openaiConfig);

app.get('/', (req, res) => {
  res.send('Hello');
});

async function generateResponse(req, res, prompt) {
  try {
    const { code } = req.body;
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 2048,
    });
    res.send(completion.data.choices[0].text);
  } catch (error) {
    res.send('error');
  }
}

app.post('/code/:data', async (req, res) => {
  const { data } = req.params;
  await generateResponse(req, res, `Convert this code ${req.body.code} into ${data}`);
});

app.post('/debug', async (req, res) => {
  await generateResponse(req, res, `Debug this code ${req.body.code} if there is an error in it`);
});

app.post('/quality', async (req, res) => {
  await generateResponse(req, res, `Check this code ${req.body.code} quality is good or not`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
