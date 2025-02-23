const express = require("express");
const router = express.Router();
const Url = require("../models/url");
const shortid = require("shortid");
const { generateNewShortUrl,handleRedirectToOriginalUrl,getUrlAnylatics } = require("../controllers/url");

router.post("/url", generateNewShortUrl);

router.get("/:id",handleRedirectToOriginalUrl);

router.get("/analytics/:id",getUrlAnylatics);

module.exports = router;
