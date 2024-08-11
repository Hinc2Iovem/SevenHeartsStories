import jwt, { VerifyErrors, VerifyOptions } from "jsonwebtoken";
import env from "../utils/validateEnv";
import { RequestHandler } from "express";

interface DecodedBody extends VerifyOptions {
  StaffInfo: {
    staffId: string;
    username: string;
    roles: string[];
  };
}

export const verifyEditor: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    env.ACCESS_TOKEN_SECRET,
    // @ts-ignore
    (err: VerifyErrors, decoded: DecodedBody) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      if (
        !decoded.StaffInfo.roles.includes("Editor") ||
        !decoded.StaffInfo.roles.includes("editor")
      ) {
        return res
          .status(403)
          .json({ message: "You do not have enought rights for this" });
      }
      next();
    }
  );
};
