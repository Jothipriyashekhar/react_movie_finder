const router = require('express').Router();
const mongocontroller = require('./mongocontroller');
var jwt = require('jsonwebtoken');
let ajax = require('superagent');
var request = require('superagent-relative');


//creating new users
router.post('/newusers', function(req,res){
      try{
      	mongocontroller.addusers(req.body.newuserobj,function(status){
      		res.status(200).json(status);
      	},
      	function(err){
      		res.status(500).json({error:'cannot create user'});
      	});
      }
      catch(err){
      	res.status(500).json({
      		error:'Internal Error'
      	});
      }
  })

  //checking login credentials
  router.post('/login', function(req,res){
        try{
        	mongocontroller.usercredentials(req.body.loginuserobj,function(status,err){
            console.log(status,"status")
            if(status !== null){
              console.log("if")
            var token=jwt.sign({status:status},'mysecretKey');// passing the token to client,payload --->obj/string
            console.log(token,"token")
            res.status(200).json({Generatedtoken:token});
          }
          else {
            console.log("else")
            res.status(404).json({error:'user not found'});
          }
          	},
        	function(err){
        		res.status(500).json({error:'cannot login user'});
        	});
        }
        catch(err){
        	res.status(500).json({
        		error:'Internal Error'
        	});
        }
    })
//accessing user from token
  router.get('/verifyusers',function(req,res){
          try{
               let token = req.headers.authorization
               //console.log(token)
               jwt.verify(token,"mysecretKey",(err,decod)=>{
                //console.log(decod.status,"decod")
                res.send({userobj:decod.status})
        })
          } catch(err) {
            res.status(500).json({
              error: 'Internal error occurred, please report...!'
            });
          }
        });
  //accessing movie name from client side using querystring
  router.get('/search', function(req,res){
    console.log(req.query.name)
    let name = req.query.name
    let url = 'https://api.themoviedb.org/3/search/movie?api_key=4b54b81d0c1ed173e21d28cf68db9002&query='+name
    ajax.get(url)
        .end(function(err,result){
          if(err)
           console.log(err)
         else
           console.log(result.body,"response")
           res.send(result.body)
        })

  })

  //add Favourites
       router.post('/addfavorite',function(req,res){
         console.log(req.body.title)
         console.log(req.body.username)
         try{
           mongocontroller.addfavorite(req.body.title,req.body.username,function(status){
             res.status(200).json(status);
           },
           function(err){
             res.status(500).json({error:'cannot add favorite'});
           });
         }
         catch(err){
           res.status(500).json({
             error:'Internal Error'
           });
         }
       })

  //remove Favourites
  router.post('/removefavorite',function(req,res){
    console.log(req.body.title,req.body.username)
    try{
      mongocontroller.removefavorite(req.body.title,req.body.username,function(status){
        res.status(200).json(status);
      },
      function(err){
        res.status(500).json({error:'cannot remove favorite'});
      });
    }
    catch(err){
      res.status(500).json({
        error:'Internal Error'
      });
    }
  })


module.exports = router;
