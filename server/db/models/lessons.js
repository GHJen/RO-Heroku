const Sequelize = require('sequelize')
const db = require('../db')

const Lessons = db.define('lessons', {
  unit: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 30
    }
  },
  lessonNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 20
    }
  },
  lessonType: {
    type: Sequelize.ENUM(['reading', 'worksheet'])
  }
})

module.exports = {Lessons}
