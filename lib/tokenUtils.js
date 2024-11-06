import { jwtVerify, SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode("ccc-secret-key");

async function generateToken(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(SECRET_KEY);
  return token;
}

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      verified: true,
      payload,
    };
  } catch (error) {
    console.log("Invalid token", error);
    return { verified: false };
  }
}

export { generateToken, verifyToken };
