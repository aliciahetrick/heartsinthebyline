const db = require('./db')
const Product = require('../models/Product')
const User = require('../models/User')

// associations go here

module.exports = {
 db,
 models: {
   Product,
   User
 },
}
