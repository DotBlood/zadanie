const { poolQ } = require('../core/database')
    , router = require('express').Router()
    , today = new Date()
    , day = String(today.getDate()).padStart(2, '0')
    , month = String(today.getMonth() + 1).padStart(2, '0')
    , year = today.getFullYear()
    , formattedDate = `${year}-${month}-${day}`;



router.post('/htag', async (req, res) => {
    const fild_name = req.body.fild_name
        , tag_data = req.body.tag_data

    if (tag_data && fild_name) {

        let findFild = `    
        SELECT f.*, uf.*
        FROM filds f
        INNER JOIN user_filds uf ON f.fild_id = uf.fild_id
        WHERE f.fild_name = $1
        `

        const dataArray = await poolQ(findFild, [fild_name])

        if (dataArray.rowCount > 0) {
            if (dataArray.rows[0].user_id === req.session.auth.user_id) {
                let query = `INSERT INTO tags(tag_data, created_at, upadate_at) VALUES($1, $2, $3) RETURNING *;`;
                const InsertTag = await poolQ(query, [tag_data, formattedDate, formattedDate]);
                let qCommitTandF = `INSERT INTO tags_filds(tag_id, fild_id) VALUES($1, $2) RETURNING *;`;
                await poolQ(qCommitTandF, [InsertTag.rows[0].tag_id, dataArray.rows[0].fild_id]);
            }
            else {
                return false
            }
        }

        if (dataArray.rowCount > 0) {
            return res.redirect('back')
        }
    }
    // add error handler
    return res.redirect('/')
})

router.delete('/htag/remove', async (req, res) => {
    let tag_id = req.body.tag_id
    const user_id = req.session.auth.user_id

    if (tag_id) {
        query = `
        WITH deleted_tags AS (
            DELETE FROM tags
            WHERE tag_id = $1
            RETURNING tag_id
          )
          DELETE FROM tags_filds
          WHERE tag_id IN (SELECT tag_id FROM deleted_tags)
            AND EXISTS (
              SELECT 1
              FROM user_filds
              WHERE fild_id = tags_filds.fild_id AND user_id = $2
          );
    `
        await poolQ(query, [tag_id, user_id])

        qureSelect = `
    SELECT t.tag_id, t.tag_data, f.fild_id, f.fild_name, u.user_id, u.username
    FROM tags t
    JOIN tags_filds tf ON t.tag_id = tf.tag_id
    JOIN filds f ON tf.fild_id = f.fild_id
    JOIN user_filds uf ON f.fild_id = uf.fild_id
    JOIN users u ON uf.user_id = u.user_id
    WHERE u.user_id = $1;
    `
        const dataArray = await poolQ(qureSelect, [user_id])
        if (dataArray.rowCount > 0) {
            return res.json(dataArray.rows)
        };
    }
    res.status(406).redirect('/')
})

module.exports = router