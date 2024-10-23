import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const hashPassword = async (password )  => {
  return bcrypt.hash(password, 10)
}

export const comparePasswords = async (password , hashedPassword ) => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload )  => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn :'1d' })
}

export const verifyToken = (token ) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}
