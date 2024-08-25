import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export   function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.json({ msg: "token not found" });

  const token = authHeader.split(" ")[1]; 
  try {
    const decoded = jwt.verify(token, JWT_SECRET); 

    if (!decoded) return res.json({ msg: "unauthenticated" });
    req.userId = decoded.userId;
    next();
  } catch (error) { 
    return res.status(403).json({error});
  }
}
