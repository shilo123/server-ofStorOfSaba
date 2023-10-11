const express = require("express");
const app = express();
const port = 3000;
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

app.get("/", async (req, res) => {
  res.json(await collection.find({}).toArray());
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
