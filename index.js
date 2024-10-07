const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./database");
const cookieParser = require("cookie-parser");
const { restrictToUsrLoggin, checkAuth } = require("./middlerwares/auth");
const status = require("express-status-monitor");

const URL = require("./model/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8002;

connectToMongoDB("mongodb://localhost:27017/shortUrl2").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(status());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToUsrLoggin, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visiteHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server stated at Port:${PORT}`));
