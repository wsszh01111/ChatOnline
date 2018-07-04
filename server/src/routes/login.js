const pool = require('../db');

//////////
// routes configuration about login
//////////

module.exports = (app) => {
    app.get('/login', async (req, res)=>{
        const {rows} = await pool.query('SELECT NOW()')
        res.send(`ok：${rows[0]['now']}`)
    });
}