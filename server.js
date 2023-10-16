const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
let mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
// const twilio = require("twilio");

app.use(bodyParser.json());
app.use(cors());
(async () => {
  const url =
    "mongodb+srv://hazshilo:1234@cluster1.ifbyw.mongodb.net/?tlsAllowInvalidCertificates=true";
  const connection = await mongo.connect(url);
  const db = connection.db("mydb1");
  collection = db.collection("products");
})();
(async () => {
  const url =
    "mongodb+srv://hazshilo:1234@cluster1.ifbyw.mongodb.net/?tlsAllowInvalidCertificates=true";
  const connection = await mongo.connect(url);
  const db = connection.db("mydb1");
  collectionU = db.collection("users-and-pratim");
})();

app.get("/", async (req, res) => {
  res.json(await collection.find({}).toArray());
});
app.get("/findPritim", async (req, res) => {
  let data = await collectionU.find({}).toArray();
  res.send(data);
});
app.post("/SendData", async (req, res) => {
  // console.log(req.body.products);
  await collectionU.insertMany([req.body]);
  res.json("ok");
});
app.delete("/delco", async (req, res) => {
  await collectionU.deleteMany({});
  res.json("ok");
});
app.delete("/Delhazmana/:id", async (req, res) => {
  let id = req.params.id;
  await collectionU.deleteOne({ _id: new ObjectId(id) });

  res.json("ok");
});
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
