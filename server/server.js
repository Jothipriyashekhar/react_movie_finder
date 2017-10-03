const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  path = require('path'),
  server = require('http').Server(app),
  mongoose = require('mongoose')
// let ajax = require('superagent');
// var request = require('superagent-relative');


let mongo = {
  host:'127.0.0.1',
  port:27017,
  usr:'mongo',
  pwd: 'mongo',
  masterDB:'movieapp',
};
mongo['mongoURL'] = ('mongodb://' + mongo.host + ':' + mongo.port + '/' + mongo.masterDB);

mongoose.connect(mongo['mongoURL']);

mongoose.connection.on('connected',function(){
     console.log("successfully connected");
})
//allowing server to access client folder
 app.use(express.static(path.join(__dirname, '../', 'client')));
  app.use(bodyParser());

 app.get('/', function(req, res) {
   console.log("got a request");
   res.sendFile(path.join(__dirname, "../", "client/index.html"));
 });

 app.use('/users',require(path.join(__dirname, './users')));

  /*when using backtick
  let url = `https://api.themoviedb.org/3/search/movie?api_key=4b54b81d0c1ed173e21d28cf68db9002&query=${name}`
   using params
 app.get('/search/:name', function(req,res){
   console.log(req.params.name)
   let name = req.params.name
   let url = 'https://api.themoviedb.org/3/search/movie?api_key=4b54b81d0c1ed173e21d28cf68db9002&query='+name
   ajax.get(url)
       .end(function(err,res){
         if(err)
          console.log(err)
        else
          console.log(res.body,"response")
       })

  })*/



server.listen(8000, function() {
  console.log('server started on  8000');
});
