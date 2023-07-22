import userModel from "../../DB/models/users.model.js";
import JWT from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  if (accessToken) {
    const userData = JWT.verify(accessToken, process.env.TOKEN_KEY);

    if (userData && userData.id) {
      const isUserExist = userModel.findById(userData.id);

      if (!isUserExist)
        return res.status(401).json({ status: "Error", message: "Please sign up first!" });
    }

    req.userData = userData;
    return next();
  }

  res.status(400).json({ status: "Error", message: "Token is missing!" });
};
