const shortid = require("shortid");
const URL = require("../model/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  // console.log(body);
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();
  const allUrls = await URL.find({});
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visiteHistory: [],
  });
  return res.render("home", {
    id: shortId,
    urls: allUrls,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visiteHistory.length,
    analytics: result.visiteHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
