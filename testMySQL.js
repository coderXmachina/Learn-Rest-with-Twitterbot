var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : '10.44.43.43',
    user     : 'root',
    password : 'qwaszx1234',
    database : 'Donation'
});

connection.connect();

connection.query('SELECT * FROM activity', function (error, results, fields) {
    if (error) throw error;
    else
        console.log('Its been a long time old friend:\n\n ', results[0]);

    console.log(results[1].activity_name);
    console.log(results[1].amount_needed);
    console.log(results[1].start_date);
    console.log(results[1].end_date);
});

connection.query('SELECT * FROM donor', function (error, res, fields) {
    if (error) throw error;
    else
        console.log('It Truly has:\n\n ', res[0]);
});

connection.end();