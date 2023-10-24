const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const cors = require("cors");
let mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const mailjetModule = require("node-mailjet");
const multer = require("multer");
const AWS = require("aws-sdk");
// const twilio = require("twilio");
app.use(bodyParser.json());
app.use(cors());
async function sendEmail(receiver, subject, body) {
  const request = mj.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "haz.shilo@gmail.com",
          Name: "שילה",
        },
        To: [
          {
            Email: receiver,
            Name: "סבא משה",
          },
        ],
        Subject: subject,
        HTMLPart: body,
      },
    ],
  });
  try {
    const result = await request;
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const mj = mailjetModule.Client.apiConnect(
  "58ab99b62c0faacf8a4bee2f0f050bfa",
  "032a7cab0e5b8c6a5596ba858873e695"
);
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
app.get("/", async (req, res) => {
  // await collection.updateMany({}, { $set: { imageName: "" } });
  res.json(await collection.find({}).toArray());
});
app.post("/sendMail", async (req, res) => {
  // console.log(req.body);
  let arrProduct = [];
  let ishi = req.body.ishi;
  let ashrai = req.body.ashrai;
  let str = "";
  let CoSum = "";
  req.body.products.forEach((element) => {
    str += `<p>שם המוצר:${" "}${element.name}</p> <p>מחיר המוצר: ${" "}${
      element.price
    }</p><p>כמות:${element.Some}<p>`;
    CoSum += `${element.price} +`;
  });

  let PRname = arrProduct.join(",");
  console.log(PRname);
  let nose = `הזמנה חדשה מאת: ${ishi.Inputshem}`;

  let mes = `          <html>
  <body>
    <h1>פרטים אישיים</h1>
    <p>שם המזמין: ${ishi.Inputshem}</p>
    <p>מייל ${ishi.Inputmail}</p>
    <p>טלפון: ${ishi.Inputphone}</p>
    <p>כתובת: ${ishi.InputAdress}</p>
    <h1>פרטי אשראי</h1>
    <p>מספר כרטיס: ${ashrai.misparCartis}</p>
    <p>תוקף כרטיס:
    שנה:${ashrai.validity.year}
    חודש:${ashrai.validity.month}
    </p>
    <p>ספרות אבטחה: ${ashrai.cvv}</p>
    <p> תעודת זהות של בעל הכרטיס: ${ashrai.tz}</p>
    <h1>מוצרים</h1>
    <p>------------------------------------------------------<p>
    ${str}
    <p>------------------------------------------------------<p>
    <h4>חישוב:</h4>
    <p>${CoSum}</p>
    <h1>סך הכל</h1>
  <strong>${req.body.sum}</strong>
  </body>
</html>
`;
  (async () => {
    // const receiver = "mozs503.h@gmail.com";
    const receiver = "haz.shilo@gmail.com";
    // const receiver = "tzahi556@gmail.com";
    const subject = nose;
    const body = mes;

    try {
      const result = await sendEmail(receiver, subject, body);
      console.log(result);
    } catch (error) {
      console.log(result);
      console.log("ERRRRRRROR", error);
    }
  })();

  res.json("ok");
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
app.post("/shinuyTmuna/:id", upload.single("file"), async (req, res) => {
  // console.log("kriaa");
  // // console.log(req.file);
  // console.log(req.params.id);
  const id = req.params.id;
  const params = {
    Bucket: "dagmusht",
    Key: req.file.originalname,
    Body: req.file.buffer, // גוף הבקשה אמור להכיל את הקובץ עצמו
  };
  async function update(publicUrl) {
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { imageName: publicUrl } }
    );
  }
  s3.upload(params, (err, data) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "שגיאה בהעלאת הקובץ ל-S3.", error: err.message });
    }
    // console.log(data.Location);
    const publicUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    // console.log("publicUrl", publicUrl);
    update(publicUrl);
  });
  res.send("ok");
});
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
