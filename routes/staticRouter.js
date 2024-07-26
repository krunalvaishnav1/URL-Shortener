const express = require("express");
const URL = require("../model/url");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", {
      urls: allUrls
    });
  } catch (err) {
    console.error("Error fetching URLs", err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
