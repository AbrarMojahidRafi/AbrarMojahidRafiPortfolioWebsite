const jwt = require("jsonwebtoken");
const {validateUserModel, UserModel} = require("../models/users");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  // console.log("Auth Middleware - Token:", token);
  
  if (!token) {
    // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
  const jwtToken = token.replace("Bearer", "").trim();
  // console.log("jwt", jwtToken);

  try {
    // Verifying the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY_FOR_GENERATING_TOKEN);
    console.log(isVerified);   // works fine

    // getting the complete user details & also we don't want password to be sent
    const userData = await UserModel.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    // console.log("User data in auth middleware: ", userData);
    // console.log(req.user);
    
    // Making Custom Properties in the req object
    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;