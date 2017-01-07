//Require sequelize as it is the interpreter for the JS to MySQL lenguage
const Sequelize = require('sequelize');

//Stores the instance of the connection to the database, reads .env that holds the environmental variables
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

//Authenticates connection with database, checks for succesfull connection.
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

//Sequelize creates table
var Url_shortener = sequelize.define('url_shortener', {
    original_url: {
        type: Sequelize.STRING
    },
    shortened_url: {
        type: Sequelize.STRING,
        unique: true
    }
});

//Synchs DB content
sequelize.sync();

//Exports sequelize and Url_shortener
exports.sequelize = sequelize;
exports.Url_shortener = Url_shortener;
