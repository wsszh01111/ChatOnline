const loginRoutes = require('./routes/login');
const path = require('path');

//////////
// routes configuration
//////////

module.exports = (app) => {

    app.get('/', (req, res)=>{
        res.sendFile(path.resolve(__dirname, '../public/index.html'));
    })

    // routes configuration about login
    loginRoutes(app);
}