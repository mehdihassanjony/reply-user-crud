const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongodbconn = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongodbconn;
