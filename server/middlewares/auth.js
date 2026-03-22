import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again.",
      });
    }

    // 🔥 Bearer token handle
    const token = authHeader.split(" ")[1]; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again.",
      });
    }

    req.body.userId = decoded.id;

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default userAuth;