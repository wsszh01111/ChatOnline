const pool = require('../db');

//////////////////////////////////////
// routes configuration about login
//////////////////////////////////////

const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.post('/loginRequest', async (req, res)=>{
        const token = jwt.sign({iss: 'db'}, 'asdf', {expiresIn: '0.5h'});
        console.log('this is loginRequest', token);
        res.cookie('c', token, {maxAge: 900000, httpOnly: true});
        res.json({status:0});
        // const {rows} = await pool.query('SELECT NOW()')
        // res.send(`ok：${rows[0]['now']}`)
    });

    app.post('/verifyRequest', (req, res)=>{
        res.json({status:0});
    });
}