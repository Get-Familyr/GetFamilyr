const db = {}

db.user = require('./user.model')

db.household = require('./household.model')

db.member = require('./member.model')

module.exports = db;