var express=require("express");
var app=express();
var http = require('http');
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  port:3306,
  database : 'birthday'});
connection.connect();
var bodyparser = require('body-parser');
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());

app.post('/adddata',function(req, res){
	console.log(req.body);
	var input = JSON.parse(JSON.stringify(req.body));
  
	   var data = {
            
           name    : input.name,
           mobile  : input.mobile,
           date    : input.date,
           time    : input.time 
        
        };
	connection.query("INSERT INTO infoday set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          
          
        });

});
app.get('/getdata', function (req, res) {  
  console.log('I received a GET request')
        connection.query('SELECT * FROM infoday',function(err,rows)
        {
            
            if(err){
                console.log("Error Selecting : %s ",err );
              }
               else{
               res.json(rows);
           }
        
        });
  
  
  });
app.delete('/removedata/:id',function(req,res){
      var id = [parseInt(req.params.id)];
      console.log(id);
     
        connection.query('DELETE FROM infoday  WHERE id = ?',[id], function(err, rows)
        {
            if(err)
                 console.log("Error deleting : %s ",err );
            
                return res.status(200).json(rows);
        });

    });

app.get('/editdata/:id', function(req, res){
    
  var id = parseInt(req.params.id);
  
  console.log(id);
    
       
        connection.query('SELECT * FROM infoday WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
               
              return res.status(200).json(rows);
         });
        
});

app.put('/updatedata/:id', function (req, res) {
   
  var id = parseInt(req.params.id);
  var input = JSON.parse(JSON.stringify(req.body));
       var data = {
            
           name    : input.name,
           mobile  : input.mobile,
           date    : input.date,
           time    : input.time 
              };
   connection.query('UPDATE infoday set ? WHERE id = ?',[data,id],function(err,rows){
                if(err)
                        {
                  console.log('Error while updating the data:%s',err);
                       }
               else{
                    
                 return res.status(200).json(rows);
               }
             });
});   






app.listen(5000);
console.log(" Server running on 5000");
