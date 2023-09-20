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
let collection = null;
(async () => {
  const url = "mongodb://localhost:27017";
  const connection = await mongo.connect(url);
  const db = connection.db("mydb");
  collection = db.collection("file");
})();
app.get("/", async (req, res) => {
  res.json(await collection.find({}).toArray());
});
app.post("/req", async (req, res) => {
  try {
    console.log("kria");
    const all = await collection.find({}).toArray();
    console.log(all.length);
    function Filterdata(data, filtos) {
      return data.map((element) => {
        const objFilt = {};
        Object.keys(element).forEach((k) => {
          if (filtos.includes(k)) {
            objFilt[k] = element[k];
          }
        });
        return objFilt;
      });
    }

    let arr = ["name", "description", "url", "category", "language"];
    const mydata = Filterdata(req.body, arr);

    console.log(mydata);

    // const { name, description, url, category, language } = req.body;
    if (all.length <= 0) {
      await collection.insertMany(mydata);
      res.json("ok");
    } else {
      res.send("no");
    }
  } catch (error) {
    res.json("no");
  }
});
app.delete("/del", async (req, res) => {
  await collection.deleteMany({});
  res.send("מחקתי");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
