require('os')
require('dotenv').config()

// libs
const express = require('express')
    , session = require('express-session')
    , PgSession = require('connect-pg-simple')(session)
    , fs = require('fs')
    , { join } = require('path');


// db
const { pool, poolQVE } = require('./src/core/database')
// require router
const auth = require('./src/router/auth')

//require api router
const apiFk = require('./src/api/fk')
    , apiHtag = require('./src/api/tag')
    , apiChat = require('./src/api/chats')
    , authMe = require('./src/core/mwAuth')


// vars
const app = express()
    , port = process.env.S_PORT || 3000
    , hostname = process.env.S_HOST || `localhost`

// session params
const pgSession = new PgSession({
    pool: pool,
    createTableIfMissing: true,
    tableName: 'sessions',
});


// public
app.set('view engine', 'ejs');
app.use(express.static('public'));


// options
app.use(express.json({
    type: ['application/json', 'text/plain']
}))
app.use(express.urlencoded({ extended: true }))

app.use(session({
    resave: false,
    store: pgSession,
    saveUninitialized: false,
    secret: process.env.SECRET_SESSION,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));


// main router
app.get('/', (req, res) => {
    if (req.session.auth) {
        return res.render('index', { Auth: { username: req.session.auth.username, email: req.session.auth.email } });
    }
    return res.render('index');
})



// API
app.use('/api/v1', (async (req, res, next) => { await authMe(req, res, next) }), apiFk)
app.use('/api/v1', (async (req, res, next) => { await authMe(req, res, next) }), apiHtag)
app.use('/api/v1', (async (req, res, next) => { await authMe(req, res, next) }), apiChat)

// Router
app.use(auth)


// StartUp
app.listen(port, hostname, async () => {
    const data = fs.readFileSync(join(__dirname, 'file.sql'), { encoding: 'utf-8' })
    await poolQVE(data)
    console.log(`Server Has start on http://localhost:${port} !`)
})