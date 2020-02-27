import { promisfy } from "util";
import jwt from "jsonwebtoken";

import authConfig from "../../config/AuthConfig";

export default async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) return res.status(401).json({ error: "token not provide" });

  const [, token] = authHeaders.split(" ");

  try {
    const decoded = await promisfy(jwt.verify)(token, authConfig.secret);
    console.log(decoded);

    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({
      error: "Token not authorized"
    });
  }
};
