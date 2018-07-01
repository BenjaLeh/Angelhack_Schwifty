var mysql = require("mysql");
var pool = mysql.createPool({

    host     : 'localhost',
    user     : 'root',
    password : 'bjm777',
    port: '3306',
    database: 'Angelhack',

  });

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;