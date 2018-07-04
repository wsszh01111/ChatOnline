const {Pool} = require('pg');
const {pgConfig} = require('./config');

//////////
// db connection
//////////

// exports connection pool
module.exports = new Pool(pgConfig);