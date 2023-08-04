const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
require("dotenv").config();
const app = express();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());

app.use(express.json());

const openai = new OpenAIApi(configuration);

// app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});



// for code
//https://gai-201-server-language-converter.vercel.app/code/python

app.post("/code/:data", async (req, res) => {
  let { data } = req.params;
  let { code } = req.body;
  

  try {
    const comp = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Convert this code ${code} into ${data}`,
      max_tokens: 2040,
    });
    res.send(comp.data.choices[0].text);
  } catch (error) {
    res.send(console.log(error));
  }
});


// for debug 
//https://gai-201-server-language-converter.vercel.app/debugcode
app.post("/debugcode", async (req, res) => {
    let { code } = req.body;
    console.log(code);
  
    try {
      const comp = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Debug this code ${code} if there is an error in this code`,
        max_tokens: 2040,
      });
      res.send(comp.data.choices[0].text);
    } catch (err) {
      res.send(console.log(err));
    }
  });


  // for quality
//https://gai-201-server-language-converter.vercel.app/qualitycode

app.post("/qualitycode", async (req, res) => {
    let { code } = req.body;
    console.log(code);
  
    try {
      const comp = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Check the code ${code} quality is good or bad`,
        max_tokens: 2040,
      });

      res.send(comp.data.choices[0].text);
    } catch (err) {
      res.send(console.log(err));
    }
  });


app.listen(process.env.PORT, () => {
  console.log(`Srver at running on port ${process.env.PORT}`);
});