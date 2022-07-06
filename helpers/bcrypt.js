const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = { hashPassword }
