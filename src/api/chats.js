const { poolQ, poolQVE } = require('../core/database')
    , router = require('express').Router()
    , today = new Date()
    , day = String(today.getDate()).padStart(2, '0')
    , month = String(today.getMonth() + 1).padStart(2, '0')
    , year = today.getFullYear()
    , formattedDate = `${year}-${month}-${day}`;

router.get("/chats", async (req, res) => {
    let query = `SELECT * FROM cheanls WHERE isprivate = ${false}`;
    const dataArray = await poolQVE(query);
    if (dataArray.rowCount > 0) {
        return res.status(200).json(dataArray.rows);
    }
    return res.status(406).json({ msg: undefined })
})

router.get("/chat/private", async (req, res) => {
    let query = `SELECT * FROM cheanls WHERE isprivate = TRUE AND owner_id = $1`;
    const dataArray = await poolQ(query, [req.session.auth.user_id]);
    if (dataArray.rowCount > 0) {
        return res.status(200).json(dataArray.rows)
    }
    else {
        return res.status(406).json({ msg: undefined })
    }
})

router.post("/chat", async (req, res) => {
    const owner_id = req.session.auth.user_id
        , title = req.body.title
        , description = req.body.description
        , isVerify = false
        , isPrivate = req.body.isPrivate || false
    if (owner_id && title && description) {

        const Values = [owner_id, title, description, isVerify, isPrivate, formattedDate, formattedDate]

        let query = `INSERT INTO cheanls(owner_id, title, description, isverify, isprivate, created_at, upadate_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
        const dataArray = await poolQ(query, [...Values])

        if (dataArray.rowCount > 0) {
            return res.redirect('back');
        }
    }
    return res.status(406).redirect('/')
})


router.post('/chat/data', async (req, res) => {
    if (!req.body.cheanl_id) return res.status(406).redirect('/')
    const cheanl_id = req.body.cheanl_id;

    let query = `
    SELECT m.*
    FROM messages m
    JOIN messages_cheanls mc ON m.message_id = mc.message_id
    JOIN cheanls c ON mc.cheanl_id = c.cheanl_id
    WHERE c.cheanl_id = $1`

    const dataArray = await poolQ(query, [cheanl_id])

    if (dataArray.rowCount > 0) {
        return res.status(200).json(dataArray.rows)
    }
    return res.status(406).redirect('/');
})


router.post('/chat/send', async (req, res) => {
    if (req.body.message_text && req.body.chat_id && req.body.tag_id) {

        const msg = req.body.message_text
            , chat_id = req.body.chat_id
            , tag_id = req.body.tag_id

        let query = `
        WITH new_message AS (
            INSERT INTO messages (message_text, created_at, upadate_at)
            VALUES ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING message_id
          ), new_link AS (
            INSERT INTO messages_cheanls (message_id, cheanl_id)
            SELECT new_message.message_id, $2
            FROM new_message
            RETURNING *
          )
          INSERT INTO messages_tags (message_id, tag_id)
          SELECT new_message.message_id, $3
          FROM new_message
          RETURNING *;
        `;

        let dataArray = await poolQ(query, [msg, chat_id, tag_id]);

        if (dataArray.rowCount > 0) {
            return res.status(200).redirect('/');
        }
        return res.status(406).redirect('/');
    }
})

module.exports = router