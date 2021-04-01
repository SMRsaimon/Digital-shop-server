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
  const collection = client.db("bdshop").collection("products");
  app.post("/addProduct", (req, res) => {

    collection.insertOne(req.body)
      .then(result => {

        res.send(result.insertedCount > 0)
      })
      .catch(err => {
        console.log(err)
      })
  });


  app.get("/home", (req, res) => {

    collection.find({})
      .toArray((err, documents) => {

        res.send(documents)
      })

    app.get("/buyProduct/:id", (req, res) => {

      console.log(req.params.id)
      collection.find({ _id: ObjectID(req.params.id) })
        .toArray((err, documents) => {
          res.send(documents[0])

        })


    });

  });


});





module.exports = app