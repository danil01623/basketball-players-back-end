const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  players: [{ type: mongoose.Types.ObjectId, required: true, ref: "Player" }],
});

module.exports = mongoose.model("User", userSchema);
