const { json } = require("express");
const Url = require("../models/url");
const shortid = require("shortid");

const generateNewShortUrl = async (req, res) => {
  try {
    if (!req.body.url) {
      throw new Error("Please provide a url");
    }

    const shortId = shortid();

    await Url.create({
      shortId: shortId,
      originalUrl: req.body.url,
      visitHistory: [],
      createdBy: req.cookies.id,
    });

    return res.redirect("/home");
  } catch (error) {
    res.status(400).json({ error });
  }
};

const handleRedirectToOriginalUrl = async (req, res) => {
  try {
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
  } catch (err) {
    console.log();
    return res.sendStatus(500).json({error:err?.message ||"Something went wrong. Please try again later."}); // Internal Server Error
  }
};

const getUrlAnylatics = async (req, res) => {
  const shortId = req.params.id;
  const entry = await Url.findOne({ shortId });

  if (!entry) {
    return res.status(404).json({ error: "url not found" });
  }
  return res.status(200).json({
    anylatics: entry.visitHistory,
    totalClicks: entry.visitHistory.length,
  });
};

module.exports = {
  generateNewShortUrl,
  handleRedirectToOriginalUrl,
  getUrlAnylatics,
};
