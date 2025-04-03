const bcrypt = require('bcrypt')
const createSlug = (string) => {
    return typeof string === 'string' ? string.toLowerCase().replace(/\s+/g, '') : 'Invalid data type, string is expected'
}
const hashPassword = (password) => {
    return bcrypt.hashSync(password, 15)
}
module.exports = { createSlug, hashPassword }