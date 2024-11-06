const express = require('express');
const mysql = require('mysql');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

var connection = mysql.createConnection({
    host        : 'sql5.freemysqlhosting.net',
    user        : 'sql5738446',
    password    : 'TAA8VIgkBR',
    database    : 'sql5738446'
});

app.get('/', async (req, res) => {
    connection.connect();

    connection.query('SELECT * FROM budget', function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);

    })
})

function transformDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function encryptPassword(password){
    return password;
}

app.post('/api/signup', async (req, res) => {
    console.log("Requested signup");
    const {username, password} = req.body;
    const date = transformDate(new Date());
    const pwd = encryptPassword(password);

    connection.connect();

    connection.query('INSERT INTO user VALUES ("", ?, ?, ?)', [username, pwd, date], function (error, results, fields){
        connection.end();
        if (error) throw error;
        res.json(results);

    })
})


app.listen(port, () => {
    console.log(`Server on port ${port}`);
});