var express = require('express');
var router = express.Router();

var db = require("./utils/db");



// 获取当前时间

/* GET users listing. */
router.get('/user', function(req, res, next) {

    var uid=req.query.userid;
    console.log(uid);
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



router.get('/table', function(req, res, next) {
  var qry="select user_name,entertime,exittime,company,status_com from reg,user,status where reg.userid=user.userid and user.userid=status.userid and not DATEDIFF(date_plan,NOW());";



  db.query(qry+" "+whr,function(err,rows){
    if(err){
        res.send({title:"table",datas:rows});
    }else {
        res.send({title:"table",datas:rows});
    }
    });

});


router.get('/reservation', function(req, res, next) {
    var qry="select user_name,datetime_plan,entertime,status_com from reg,user,status"
    var whr='where reg.userid = user.userid and user.userid==status.userid and date_plan = Now()'
  
  
    db.query(qry+" "+whr,function(err,rows){
      if(err){
          res.send({title:"reservation",datas:rows});
      }else {
          res.send({title:"reservation",datas:rows});
      }
      });
  
  });


  router.post('/addvisitor/', function(req, res, next) {
    var new_visitor=req.body
// add record
  
  });

module.exports = router;