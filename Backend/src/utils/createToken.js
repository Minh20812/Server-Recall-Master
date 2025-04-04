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
    secure: true, // Luôn true vì Vercel sử dụng HTTPS
    sameSite: "none", // Quan trọng để cookie hoạt động cross-domain
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default createToken;
