const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  //Read the token
  const authHeader = req.get("Authorization");

  //verify token
  if (authHeader) {
    //Validate the token
    const token=authHeader.split(' ')[1];
    try {
      const user = await jwt.verify(token, process.env.SECRETA);
      if (!user) {
        return res.status(401).json({ msg: "Token no válido." });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ msg: "Token no válido." });
    }
  }
};
