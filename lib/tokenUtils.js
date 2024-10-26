const SECRET_KEY = process.env.JWT_SECRET || "ccc-secret-key";

function stringToBase64(str) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let binary = "";
  for (let i = 0; i < str.length; i++) {
    binary += str.charCodeAt(i).toString(2).padStart(8, "0");
  }
  let base64 = "";
  for (let i = 0; i < binary.length; i += 6) {
    const chunk = binary.slice(i, i + 6).padEnd(6, "0");
    base64 += chars[parseInt(chunk, 2)];
  }
  while (base64.length % 4) base64 += "=";
  return base64;
}

function base64ToString(base64) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let binary = "";
  for (let i = 0; i < base64.length && base64[i] !== "="; i++) {
    binary += chars.indexOf(base64[i]).toString(2).padStart(6, "0");
  }
  let str = "";
  for (let i = 0; i < binary.length; i += 8) {
    str += String.fromCharCode(parseInt(binary.slice(i, i + 8), 2));
  }
  return str;
}

function generateToken(payload) {
  // Convert email to ASCII values
  const asciiEmail = payload.email
    .split("")
    .map((char) => char.charCodeAt(0))
    .join("");
  const modifiedPayload = {
    ...payload,
    email: asciiEmail,
  };

  const header = stringToBase64(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const encodedPayload = stringToBase64(JSON.stringify(modifiedPayload));

  // Simple HMAC implementation
  let signature = "";
  const message = `${header}.${encodedPayload}`;
  for (let i = 0; i < message.length; i++) {
    signature += (
      message.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
    ).toString(16);
  }

  return `${header}.${encodedPayload}.${signature}`;
}

function verifyToken(token) {
  const [header, payload, signature] = token.split(".");

  // Verify signature
  let expectedSignature = "";
  const message = `${header}.${payload}`;
  for (let i = 0; i < message.length; i++) {
    expectedSignature += (
      message.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
    ).toString(16);
  }

  if (signature !== expectedSignature) {
    console.log("Invalid token");
    return { verified: false };
  }

  const decodedPayload = JSON.parse(base64ToString(payload));

  // Convert ASCII back to email string
  const emailChars = decodedPayload.email.match(/.{2}/g) || [];
  const email = emailChars
    .map((ascii) => String.fromCharCode(parseInt(ascii)))
    .join("");

  return {
    verified: true,
    payload: {
      ...decodedPayload,
      email,
    },
  };
}

export { generateToken, verifyToken };
