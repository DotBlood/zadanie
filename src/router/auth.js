const router = require('express').Router()
    , login = require('../controller/auth/login')
    , register = require('../controller/auth/register')
    , crypto = require('crypto')
    , sessions = crypto.randomUUID()

// Register
router.post('/auth/register', async (req, res) => {
    const userdata = req.body
    if (userdata.username && userdata.email && userdata.password) {
        try {
            const resule = await register(userdata.username, userdata.email, userdata.password)
            if (resule.rowCount > 0) {
                return setSession(req, res, resule.rows[0].user_id, resule.rows[0].username, resule.rows[0].email, sessions)
            }
        } catch (err) {
            return console.log(err);
        }
    }
    // add error handler
    return res.send('error')
})

// Login
router.post('/auth/login', async (req, res) => {
    const userdata = req.body

    if (userdata.username && userdata.password) {
        const resule = await login(userdata.username, userdata.password);
        if (resule.rowCount > 0) {
            return setSession(req, res, resule.rows[0].user_id, resule.rows[0].username, resule.rows[0].email, sessions)
        }
    }
    // add error handler
    return res.send('error')
})


const setSession = (req, res, user_id, username, email, sessions) => {
    req.session.auth = {
        'user_id': user_id,
        'username': username,
        'email': email,
        'UUID': sessions
    }

    req.session.save((err) => {
        if (err) {
            return res.sendStatus(500);
        }
        return res.redirect('/');
    });
}


// Logout
router.get('/auth/logout', async (req, res) => {
    if (req.session.auth) {
        req.session.destroy()
        return res.redirect('/')
    }
    return res.redirect('/')
})



module.exports = router;