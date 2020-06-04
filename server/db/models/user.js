const crypto = require('crypto')
const _ = require('lodash');
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  first: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  last: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngfuel.com%2Ffree-png%2Fbjfvt&psig=AOvVaw2isLlq7WCGsXr6w0PB1xvO&ust=1586873447901000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiT37nK5egCFQAAAAAdAAAAABAJ'
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
})

module.exports = User
// instance methods
User.prototype.correctPassword = function (candidatePassword) {
  return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }

}
