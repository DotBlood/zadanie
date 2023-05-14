const bcrypt = require('bcrypt')
const { poolQ } = require('../../core/database')

module.exports = login = async (username, password) => {
    const resule = await findUser(username)
    if (resule.rowCount > 0) {
        if (passwordCompare(password, resule.rows[0].password)) {
            return resule;
        }
    }
    return false;
}

const passwordCompare = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash)
}

const findUser = async (username) => {
    const qselectUser = `SELECT user_id, username, email, password FROM users WHERE username = $1`;
    const resule = await poolQ(qselectUser, [username])
    return resule
}