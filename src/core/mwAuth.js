module.exports = async function authMe(req, res, next) {
    if (req.session && req.session.auth) {
        return next()
    }
    return res.redirect('/')
}