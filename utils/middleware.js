const jwt = require("jsonwebtoken");
const User = require("../models/user");
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  console.log("the authorization is", authorization);

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    // return authorization.substring(7); // without using middleware
    request.token = authorization.substring(7);
  }
  //   return null; without using middleware
  next();
};
const userExtractor = async (request, response, next) => {
  console.log("the user extractor entered", request.token);
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    console.log("the middlewaree userewxtrac is", decodedToken);
    request.user = await User.findById(decodedToken.id);
  }

  next();
};

module.exports = { tokenExtractor, userExtractor };
