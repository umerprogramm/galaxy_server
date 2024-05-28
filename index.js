const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require("dotenv").config()
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin : '*'
}));

// MongoDB Atlas connection string
const uri = process.env.PASS;
const client = new MongoClient(uri)
async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Connected to MongoDB Atlas');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
    }
  }
  
  connectToDatabase();



  app.post('/register',async(req ,res)=>{
    const { name, phone, city, address,title  } = req.body;

    const database = client.db('form');
   await database.collection('forms').insertOne({
    name,
    phone, 
    city, 
    address,
    title
  
    });
  
      res.send('your form has been submitted')
  }) 
  app.get('/getdata',async (req,res)=>{
    const database = client.db('form');
    let col  = await database.collection("forms")
    let result = await col.find({}).toArray()
    res.send(result)
  })

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

app.listen(3000)
