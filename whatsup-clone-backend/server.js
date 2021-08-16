// importing
import express, { json } from "express";
import mongoose from "mongoose";
import colors from "colors";
// import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

import dotenv from 'dotenv'
dotenv.config()

const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL)

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(json());
app.use(cors());

// DB config
mongoose.connect(
  MONGO_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const whatsupSchema = mongoose.Schema({
  name: String,
  message: String,
  timestamp: String,
  recieved: Boolean,
});

const Messages = mongoose.model("messagecontents2", whatsupSchema);

const pusher = new Pusher({
  appId: "1200783",
  key: "a2efa7c1bc8874dea1a3",
  secret: "2858defe5f14bef13b29",
  cluster: "eu",
  useTLS: true,
});

const db = mongoose.connection;

// Pusher
db.once("open", () => {
  console.log("DB connected.".green.bold);
  const msgCollection = db.collection("messagecontents2");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    // console.log(`Change occured: `, change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved,
        _id: messageDetails._id
      }).then(() => {
        // console.log('pusher ok')
      }, () => {
        // console.log('pusher NOT ok')
      })
    } else {
      console.log("Error triggering Pusher".red.bold);
    }
  });
});

// db.once('open', () => {
//   console.log("DB OPEN!!!")
// })

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Express server");
});

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`Success. Server returned data: ${data}`);
    }
  });
});

// listener
app.listen(port, () => {
  console.log(`Server started on localhost:${port}`.green.bold);
});

