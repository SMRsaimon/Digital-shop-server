const express = require("express");
const app = express();
require('dotenv').config()
const cors = require('cors');



app.use(express.json())
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.736kg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const ObjectID = require("mongodb").ObjectID
app.use(cors())

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("bdshop").collection("products");

  const shoppingCollection = client.db("bdshop").collection("shopping");
  app.post("/addProduct", (req, res) => {

    productCollection.insertOne(req.body)
      .then(result => {

        res.send(result.insertedCount > 0)
      })
      .catch(err => {
        console.log(err)
      })
  });


  app.get("/home", (req, res) => {

    productCollection.find({})
      .toArray((err, documents) => {

        res.send(documents)
      })

  });

  app.get("/buyProduct/:id", (req, res) => {


    productCollection.find({ _id: ObjectID(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0])

      })


  });
  app.post("/checkOut", (req, res) => {


    shoppingCollection.insertOne(req.body)
      .then(result => {

        res.send(result.insertedCount > 0)
      })
      .catch(err => {
        console.log(err)
      })

  });


});





module.exports = app