import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = "";
  let authHeader = req.headers.authorization as String;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7, authHeader.length);
  } else {
    token = "";
  }

  if (!req.session?.jwt && !token) {
    return next();
  }
  token = req.session?.jwt ? req.session.jwt : token;
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;

    req.user = payload;
  } catch (err) {
    console.log(err);
  }
  next();
};
