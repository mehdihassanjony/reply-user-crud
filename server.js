const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes/routes");
require("./db/conn");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api", router);
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening`);
});
