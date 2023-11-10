const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_KEY);
    if (!verify) {
      return res.status(401).send("Unauthorized user");
    }
    req.token = verify;
    next();
  } catch (error) {
    res.status(400).send("Unable to find token");
  }
};

module.exports = auth;
