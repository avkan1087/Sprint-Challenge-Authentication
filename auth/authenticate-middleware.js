const jwt = require("jsonwebtoken");
const secrets = require('../secret/secrets');
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
      jwt.verify(token, secrets.jwtSecret, (error, tokenData) => {
      if (error){
          res.status(401).json({ message: "Invalid token"})
      } else {
          req.username = tokenData.username;
          next();
      }
      })
  }
};