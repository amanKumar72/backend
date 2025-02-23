const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamps: { type: Date } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);