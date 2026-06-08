const crypto = require('crypto')
const User = require('../models/User')

const getSecret = () => process.env.JWT_SECRET || 'change-this-secret-in-env-file'

const base64UrlEncode = (payload) => {
  return Buffer.from(JSON.stringify(payload)).toString('base64url')
}

const base64UrlDecode = (value) => {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'))
}

const signToken = (user) => {
  const header = base64UrlEncode({ alg: 'HS256', typ: 'JWT' })
  const payload = base64UrlEncode({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  })

  const signature = crypto
    .createHmac('sha256', getSecret())
    .update(`${header}.${payload}`)
    .digest('base64url')

  return `${header}.${payload}.${signature}`
}

const verifyToken = (token) => {
  const [header, payload, signature] = token.split('.')

  if (!header || !payload || !signature) {
    throw new Error('Invalid token')
  }

  const expectedSignature = crypto
    .createHmac('sha256', getSecret())
    .update(`${header}.${payload}`)
    .digest('base64url')

  if (signature !== expectedSignature) {
    throw new Error('Invalid token signature')
  }

  const decoded = base64UrlDecode(payload)

  if (decoded.exp < Date.now()) {
    throw new Error('Token expired')
  }

  return decoded
}

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized. Please login.' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    const user = await User.findById(decoded.id).select('-passwordHash -salt')

    if (!user) {
      return res.status(401).json({ message: 'User not found. Please login again.' })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired login. Please login again.' })
  }
}

module.exports = {
  signToken,
  protect,
}
