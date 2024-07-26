const mongoose = require("mongoose");

const urlschema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visiteHistory: [{ timestamp: { type: Number } }],
},
{
    timestamp: true
}
);

const URL = mongoose.model("url", urlschema);

module.exports = URL;
