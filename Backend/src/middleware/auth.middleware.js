import jwt from "jsonwebtoken";
import Config from "../config/config.js";

const protect = (req, res, next) => {
    try {
        
        let token = req.cookies.token;
        console.log(token , "middle");
        
      
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
          token = req.headers.authorization.split(" ")[1];
        }
        if (!token)
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
      
        const decoded = jwt.verify(token, Config.JWT_SECRET);
          console.log(decoded , "decoded");
      
        req.userId = decoded.userId;
        next()
    } catch (error) {
        res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
    }
};
export default protect;