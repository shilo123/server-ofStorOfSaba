const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
let mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const multer = require("multer");
const AWS = require("aws-sdk");
// const twilio = require("twilio");
app.use(bodyParser.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const s3 = new AWS.S3({
  accessKeyId: "AKIASWXFMBWARBBNHUMG", // המפתח הציבורי שלך מ-AWS
  secretAccessKey: "l0VinJ7A39RXxPZBIxxlGFGTyBOqLtMbS4TW50cu", // המפתח הפרטי שלך מ-AWS
  region: "us-east-1", // האזור בו הדלי שלך ממוקם, לדוגמה: 'us-west-2'
});

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
{
}
app.get("/", async (req, res) => {
  // await collection.updateMany({}, { $set: { imageName: "" } });
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
app.post("/upPr", async (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  let up = req.body.up;
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { name: up.upName, des: up.upDes, price: up.upPrice } }
  );
  res.json(true);
});
app.post("/insertProduct", upload.single("file"), async (req, res) => {
  // console.log(" req.file", req.file);
  const params = {
    Bucket: "dagmusht",
    Key: req.file.originalname,
    Body: req.file.buffer, // גוף הבקשה אמור להכיל את הקובץ עצמו
  };
  s3.upload(params, (err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "שגיאה בהעלאת הקובץ ל-S3.", error: err.message });
    }
    // console.log(data.Location);
    const publicUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    // console.log("publicUrl", publicUrl);
    res.send(publicUrl);
  });
});
app.post("/insertos", async (req, res) => {
  // console.log(req.body);
  let newProduct = req.body;
  await collection.insertOne({
    name: newProduct.nameProduct,
    des: newProduct.desProduct,
    price: newProduct.priceProduct,
    category: newProduct.categoryProduct,
    imageName: newProduct.Img,
  });
  res.send("ok");
});
app.delete("/Delprod/:id", async (req, res) => {
  // console.log(req.params.id);
  await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json("ok");
});
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
