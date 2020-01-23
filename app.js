const faker = require('faker');
const express = require('express');
const bodyParser = require("body-parser");
var mysql = require('mysql');
const app = express();
const port = 3000;

require('dotenv').config();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PW1,
    database: 'join_us'
});


app.get('/', (req, res) => {
    //find count of users in DB
    //send count to view
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function (err, results) {
        if (err) throw err;
        var count = results[0].count;
        res.render("home", { count: count });

    });

});

//post to our form
app.post("/register", function (req, res) {
    var person = {
        email: req.body.email
    };

    connection.query('INSERT INTO users SET ?', person, function (err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));




//bulk insert random users

// connection.connect();

// we need to use an array of arrays to bulk insert
// var data = [];

// for (i = 0; i < 500; i++) {
//     data.push([
//         faker.internet.email(),
//         faker.date.past()
//     ])
// };

// var insertStatement = 'INSERT INTO users (email, created_at) VALUES ?';

// connection.query(insertStatement, [data], function (err, results) {
//     console.log(err);
//     console.log(results);

// })

// connection.end();


