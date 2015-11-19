var express = require('express');
var mongojs = require('mongojs');

var db = mongojs('topTopic',['topTopic']);

var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

var sucuess_Status = "200";
var sucuess_Message = "Success";
var error_Status = "300";
var error_Message = "Error Service Failed";


//app.post('/topTopic',function (req,res){
//    console.log("Hi I calling...");
//    
//    db.topTopic.insert(req.body,function (err,docs){
//        res.json(docs);
//    });
//});

app.get('/topTopic',function (req,res){
    
    db.topTopic.find(function (err, docs){
        console.log(docs);
        res.json(docs);
    });
    //res.send("Hello world from server.js");
    
    console.log("Hitting server...");
});

app.post('/topTopic',function (req,res){
    console.log("post Request..");
     console.log("post Request.." + req.body);
     
     db.topTopic.insert(req.body, function (err,docs){
         res.json(docs);
     });
    
});

app.post('/login',function (req,res){
    //console.log("I am hitting server ");
    
    // console.log("I am hitting server " + req.body);
     
    // console.log(" request password is:" + req.body.password);
     
     db.topTopic.find( { email: { $eq:req.body.email  } } ,function(err,docs){
         
        
       //  res.statusCode;
       //  res.sucuess_Message;
        // res.error_Status;
        // res.error_Message;
        // docs.successMessage = sucuess_Message;
         //docs.statusCode = sucuess_Status;
         //docs.errorCode = error_Status;
         //docs.errorMessage = error_Message;
         console.log("My response is:" + docs);
         //res.json({"data":docs, statusCode:sucuess_Status , statusMessage:sucuess_Message});
         // res.json(docs,sucuess_Message, sucuess_Status,error_Status,error_Message);
          
         
        // console.log(docs );
         // console.log(" response password is:" + docs[0].password);
         if(req.body.password == docs[0].password ){
             console.log( docs[0].nickname);
             if(docs[0].nickname == 'Admin'){
                 docs[0].admin = true;
                 console.log(docs );
               res.json({"data":docs, statusCode:sucuess_Status , statusMessage:sucuess_Message});
             }else{
                  docs[0].admin = false;
                  console.log(docs );
                  res.json({"data":docs, statusCode:sucuess_Status , statusMessage:sucuess_Message});
             }
             
         }
         else{
              res.json({"data":docs, statusCode:error_Status , statusMessage:error_Message});
             console.log("Sorry password is wrong..");
         }
     });
    
   // var requestMethod = req.body;
//     db.topTopic.find(req.body,function (err,docs){
//         var data = docs;
//       //  console.log("requestMethod is:"+ json(data));
//        // console.log("requestMethod is:"+req.json(body));
//         data.forEach(function(item){
//             console.log("item is:" + item);
//         });
//         console.log(docs );
//          res.json(docs);
//     });
    
});

app.listen(3000);
console.log("Server runnig on port 3000");

