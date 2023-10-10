const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
let mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());
(async () => {
  const url = "mongodb://localhost:27017";
  const connection = await mongo.connect(url);
  const db = connection.db("mydb");
  collection = db.collection("news");
})();

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
