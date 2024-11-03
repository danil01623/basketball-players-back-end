const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  team: { type: String, required: true },
  // creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  position: String,
  nationality: String,
  jersey_number: Number,
});

module.exports = mongoose.model("Player", playerSchema);
