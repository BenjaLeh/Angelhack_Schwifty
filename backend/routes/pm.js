var express = require('express');
var router = express.Router();

var db = require("./utils/db");




router.get('/user', function(req, res, next) {

    var uid=req.query.userid;
    var qry="select * from user";
    var whr='where userid = '+uid;


  db.query(qry+" "+whr,function(err,rows){
        if(err){
            res.send({title:"usrcard",datas:[]});
        }else {
            res.send({title:"usrcard",datas:rows});
        }

    });


});

router.get('/loc', function(req, res, next) {

    var uid=req.query.userid;
    var qry="select curzone from status";
    var whr='where userid = '+uid;


  db.query(qry+" "+whr,function(err,rows){
        if(err){
            res.send({title:"location",datas:[]});
        }else {
            res.send({title:"location",datas:rows});
        }

    });
    
});


/* 获取table*/
router.get('/table', function(req, res, next) {

  var qry="select user_name,entertime,exittime,company,status_pm from reg,user,status where reg.userid=user.userid and user.userid=status.userid and not DATEDIFF(date_plan,NOW());";


  db.query(qry,function(err,rows){
        if(err){
            res.send({title:"table",datas:[]});
        }else {
            res.send({title:"table",datas:rows});
        }
        });
});

router.get('/test', function(req, res, next) {

    var qry="select * from user";

  
  
    db.query(qry,function(err,rows){
          if(err){
              res.send({err});
          }else {
              res.send({title:"table",datas:rows});
          }
          });
  });






module.exports = router;