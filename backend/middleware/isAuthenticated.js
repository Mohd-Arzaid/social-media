import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong While Validating the Authentication Token",
    });
  }
};
