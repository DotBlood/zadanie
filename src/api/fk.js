const { poolQ } = require('../core/database');
const router = require('express').Router()
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();

const formattedDate = `${year}-${month}-${day}`;


router.get('/fk', async (req, res) => {

    let queryFk = `
    SELECT f.*
    FROM filds f
    INNER JOIN user_filds uf ON f.fild_id = uf.fild_id
    WHERE uf.user_id = $1;
    `
    const dataArray = await poolQ(queryFk, [req.session.auth.user_id])
    if (dataArray.rowCount > 0) {
        return res.json(dataArray.rows);
    }
    return res.status(406).json({ "error": "msg" });
})

router.post('/fk', async (req, res) => {
    const fild_name = req.body.fild_name;

    if (fild_name && fild_name.length > 0) {

        let queryFk = `
        SELECT f.*
        FROM filds f
        INNER JOIN user_filds uf ON f.fild_id = uf.fild_id
        WHERE uf.user_id = $1 AND f.fild_name = $2;
        `

        let candidat = await poolQ(queryFk, [req.session.auth.user_id, fild_name])
        if (candidat.rowCount > 0) return res.status(404).redirect('/')

        let query = `INSERT INTO filds(fild_name, created_at, upadate_at) VALUES($1, $2, $3) RETURNING *;`
        const result = await poolQ(query, [fild_name, formattedDate, formattedDate])
        if (result.rowCount > 0) {
            await poolQ('INSERT INTO user_filds(fild_id, user_id) VALUES($1, $2)', [result.rows[0].fild_id, req.session.auth.user_id])
            return res.redirect('back')
        }
    }
    // add error handler
    return res.status(406).redirect('/')
})

router.post('/fk/findtags', async (req, res) => {
    const fild_name = req.body.fild_name;
    if (fild_name) {
        const query = `
            SELECT t.tag_id, t.tag_data, f.fild_id, f.fild_name, u.user_id, u.username
            FROM tags t
            JOIN tags_filds tf ON t.tag_id = tf.tag_id
            JOIN filds f ON tf.fild_id = f.fild_id
            JOIN user_filds uf ON f.fild_id = uf.fild_id
            JOIN users u ON uf.user_id = u.user_id
            WHERE f.fild_name = $1 AND u.user_id = $2;`
        let dataArray = await poolQ(query, [fild_name, req.session.auth.user_id])
        if (dataArray.rowCount > 0) {
            return res.status(200).json(dataArray.rows)
        }
    }
    return res.status(406).redirect('/')
})


router.post('/fmbh', async (req, res) => {
    if (!req.body.tag_data) return res.status(404).redirect('/')
    const tag_data = req.body.tag_data
    const user_id = req.session.auth.user_id

    const query = `
    SELECT m.*, mt.*, t.*
    FROM messages AS m
    JOIN messages_tags AS mt ON m.message_id = mt.message_id
    JOIN tags AS t ON mt.tag_id = t.tag_id
    JOIN tags_filds AS tf ON t.tag_id = tf.tag_id
    JOIN user_filds AS uf ON tf.fild_id = uf.fild_id
    WHERE t.tag_data = $1
    AND uf.user_id = $2;
    `

    const dataArray = await poolQ(query, [tag_data, user_id])
    if (dataArray.rowCount > 0) {
        return res.status(200).json(dataArray.rows)
    }
    else {
        return res.status(406).redirect('/')
    }

})

module.exports = router;