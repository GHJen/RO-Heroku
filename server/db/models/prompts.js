const Sequelize = require('sequelize')
const db = require('../db')

const Prompts = db.define('prompts', {
  prompt: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = {Prompts}
