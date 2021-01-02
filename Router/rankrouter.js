// const express = require('express');
// const router = express.Router();
// const mysql = require('mysql');
// const mysqlpwd = require('./topsecret');
// const postnum = 20;

// const dbhost = 'localhost';
// const dbuser = 'root';
// const dbdatabase = 'minesweeper';

// const db = mysql.createConnection({
//   host: dbhost, 
//   user: dbuser,
//   password : mysqlpwd,  
//   database: dbdatabase
// });
// db.connect();

// router.get('/:pagenum',function(request,response){

//   let pagenum = request.params.pagenum;
//   let sql = `SELECT rank,uid,recordtime FROM MineSweeper WHERE rank >= ${pagenum}
//             and rank < ${pagenum} + ${postnum} order by recordtime limit(20)`
//   db.query(sql,function(error,result){ 
//     if(error) throw error;

//   })
//   response.send('rank test');
// })

// module.exports = router;