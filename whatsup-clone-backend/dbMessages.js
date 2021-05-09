import mongoose from "mongoose";

const whatsupSchema = mongoose.Schema({
  name: String,
  message: String,
  timestamp: String,
  recieved: Boolean,
});

export default mongoose.model("messagecontents", whatsupSchema);
