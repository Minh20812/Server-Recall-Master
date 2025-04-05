import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // True for production, false for dev
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" for cross-domain in prod
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default createToken;
