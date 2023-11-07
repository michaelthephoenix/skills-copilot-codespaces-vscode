// create web server with express
const express = require('express');
const app = express();
const port = 3000;

// import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// import mysql
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});

// connect to mysql
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// get all comments
app.get('/comments', (req, res) => {
    let sql = 'SELECT * FROM comments';
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// get a comment by id
app.get('/comments/:id', (req, res) => {
    let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`;
    let query = con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// add a new comment
app.post('/comments', (req, res) => {
    let data = {name: req.body.name, comment: req.body.comment};
    let sql = 'INSERT INTO comments SET ?';
    let query = con.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// update a comment
app.put('/comments/:id', (req, res) => {
    let sql = `UPDATE comments SET name = '${req.body.name}', comment = '${req.body.comment}' WHERE id = ${req.params.id}`;
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// delete a comment
app.delete('/comments/:id', (req, res) => {
    let sql = `DELETE FROM comments WHERE id = ${req.params.id}`;
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// listen on port 3000
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});