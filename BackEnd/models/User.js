const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
  },
  { timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.salt, 100000, 64, 'sha512')
    .toString('hex')
}

userSchema.methods.checkPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 100000, 64, 'sha512')
    .toString('hex')

  return this.passwordHash === hash
}

module.exports = mongoose.model('User', userSchema)
