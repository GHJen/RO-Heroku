const User = require('./user')
const {Entries} = require('./entries')
const {Lessons} = require('./lessons')
const {Prompts} = require('./prompts')

User.hasMany(Entries)
Entries.belongsTo(User)
User.hasMany(Prompts)
Prompts.belongsTo(User)

module.exports = {
  User,
  Entries,
  Lessons,
  Prompts
}
