// importing
import express, { json } from "express";
import mongoose from "mongoose";
import colors from "colors";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(json());
app.use(cors());

// DB config
mongoose.connect(
  "mongodb+srv://admin:6mdoMeBecXJ6iji0@cluster0.m2mza.mongodb.net/whatsupclonedb?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const pusher = new Pusher({
  appId: "1200783",
  key: "a2efa7c1bc8874dea1a3",
  secret: "2858defe5f14bef13b29",
  cluster: "eu",
  useTLS: true,
});

// Pusher
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected.".green.bold);
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(`Change occured: `, change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved,
      });
    } else {
      console.log("Error triggering Pusher".red.bold);
    }
  });
});

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Express server");
});

app.get("/messages/sync", (req, res) => {
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

// 6mdoMeBecXJ6iji0
// mongodb+srv://admin:6mdoMeBecXJ6iji0@cluster0.m2mza.mongodb.net/whatsupclonedb?retryWrites=true&w=majority
