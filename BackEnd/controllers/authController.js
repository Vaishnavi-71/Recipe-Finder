const User = require('../models/User')
const { signToken } = require('../middleware/authMiddleware')

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  favorites: user.favorites || [],
})

const sendUserWithToken = (res, user, message) => {
  const token = signToken(user)

  res.json({
    message,
    token,
    user: formatUser(user),
  })
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' })
    }

    const user = new User({ name, email, favorites: [] })
    user.setPassword(password)
    await user.save()

    sendUserWithToken(res, user, 'Registration successful')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })

    if (!user || !user.checkPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    sendUserWithToken(res, user, 'Login successful')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProfile = async (req, res) => {
  res.json({
    user: formatUser(req.user),
  })
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
}
