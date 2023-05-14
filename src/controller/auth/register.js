const bcrypt = require('bcrypt')
const { poolQ } = require('../../core/database')

module.exports = register = async (username, password, email) => {
    return await UserInsert(username, email, password)
}

const UserInsert = async (username, email, password) => {
    const hashPassword = passwordHash(password);

    const queryInsertNewUser = `
        INSERT INTO users(username, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT(username) DO NOTHING
        RETURNING *;
        `
    try {
        const result = await poolQ(queryInsertNewUser, [username, email, hashPassword])
        return result
    } catch (err) {
        return err
    }
}

const passwordHash = (password) => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}