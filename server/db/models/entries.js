const Sequelize = require('sequelize')
const db = require('../db')

const Entries = db.define('entries', {
  prompt: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  text: {
    type: Sequelize.TEXT
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

Entries.prototype.addTag = async function(tag) {
  if (!this.tags.includes(tag)) {
    const newTags = [...this.tags, tag]
    this.tags = newTags
    await this.save()
  }
}
Entries.prototype.removeTag = async function(tag) {
  const newTags = this.tags.filter(el => {
    if (el !== tag) return el
  })
  this.tags = newTags
  await this.save()
}

module.exports = {Entries}
