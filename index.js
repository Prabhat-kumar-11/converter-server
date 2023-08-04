const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const cors=require("cors")
require("dotenv").config();
const app = express();


const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY
});
app.use(cors())


app.use(express.json())


const openai = new OpenAIApi(configuration)
app.use(express.json());


app.get("/",(req,res)=>{
  res.send("hello")
})


app.post("/code/:data",async (req,res)=>{
  let {data} = req.params
  let {code}=req.body   
  console.log(code,data)
  try {
   
      const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`Convert this code ${code} into ${data}`,
        max_tokens: 2048,
      });
      res.send(completion.data.choices[0].text);
    
  } catch (error) {
    res.send(
      'error'
    )
  }
})

app.post("/debug",async (req,res)=>{

  let {code}=req.body   
  console.log(code)
  try {
   
      const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`Debug this code ${code} if there is error in it `,
        max_tokens: 2048,
      });
      res.send(completion.data.choices[0].text);
    
  } catch (error) {
    res.send(
      'error'
    )
  }
})

app.post("/quality",async (req,res)=>{

  let {code}=req.body   
  console.log(code)
  try {
   
      const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`Check  this code ${code} quality is good or not `,
        max_tokens: 2048,
      });
      res.send(completion.data.choices[0].text);
    
  } catch (error) {
    res.send(
      'error'
    )
  }
})
app.listen(process.env.port, () => {
  console.log(`Server listening on port ${process.env.port}`);
});