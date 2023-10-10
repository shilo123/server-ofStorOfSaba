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

    // const { name, description, url, category, language } = req.body;
    if (all.length <= 0) {
      await collection.insertMany(mydata);
      res.json("ok");
    } else {
      res.send(all);
    }
  } catch (error) {
    console.log("error", error);
    res.json(error);
  }
});
app.get("/findFavorite/:id", async (req, res) => {
  // console.log(req.params.id);
  try {
    let ids = req.params.id.split(",");
    ids = ids.map((e) => {
      return (e = { _id: new ObjectId(e) });
    });
    async function hamara(e) {
      return (e = await collection.find(e).toArray());
    }
    async function lambra(ids) {
      const res = await Promise.all(ids.map((e) => hamara(e)));
      return res;
    }
    lambra(ids)
      .then((data) => {
        console.log("res", data);
        res.json({ res: true, resData: data });
      })
      .catch((e) => console.log("e=>>>", e));
  } catch (error) {
    res.json({ error: error });
  }
});
app.get("/:id", async (req, res) => {
  // console.log("he");
  // console.log(req.params.id);
  let id = req.params.id;
  const idG = { _id: new ObjectId(id) };
  let catava = await collection.find(idG).toArray();
  // console.log(catava);
  res.json({ reso: "ok", catava: catava });
});
app.delete("/del", async (req, res) => {
  await collection.deleteMany({});
  res.send("מחקתי");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
