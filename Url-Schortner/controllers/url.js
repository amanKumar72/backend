const Url = require("../models/url");
const shortid = require("shortid");

const generateNewShortUrl = async (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({ error: "Please enter a valid url" });
  }

  const shortId = shortid();

  await Url.create({
    shortId: shortId,
    originalUrl: req.body.url,
    visitHistory: [],
  });

  return res.status(201).json({ shortUrl: shortId });
};

const handleRedirectToOriginalUrl = async (req, res) => {
  const shortId = req.params.id;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).json({ error: ` "url not found" ${entry}` });
  }

  res.status(301).redirect(entry.originalUrl);
};

const getUrlAnylatics = async (req, res) => {
  const shortId = req.params.id;
  const entry = await Url.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ error:"url not found"  });
  }
  return res.status(200).json({
    anylatics: entry.visitHistory,
    totalClicks: entry.visitHistory.length,
  });
};

module.exports = { generateNewShortUrl, handleRedirectToOriginalUrl, getUrlAnylatics };
