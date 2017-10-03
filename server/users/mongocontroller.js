let Usermodel = require('../../models/users');

let addusers = function (newuserobj, successCB, errorCB) {
	var user = new Usermodel({
	Username : newuserobj.username,
	Password : newuserobj.password,
	});
	console.log('users: ', user)
  user.save(function (err, result) {
		if(err) {
			console.log(err);
			errorCB(err);
		}
		console.log(result);
		successCB(result);
	});

};

let usercredentials = function(loginuserobj,successCB,errorCB){
	console.log(loginuserobj,"loginuserobj")
	  Usermodel.findOne({Username:loginuserobj.username,Password :loginuserobj.password},function(err,result){
			console.log(result,"result")
			// console.log(result.Password)
			// console.log(loginuserobj.password)
			if(err)
			  errorCB(err);
			else{
				 successCB(result);
			 }

		})
}

let addfavorite = function(title,username,successCB,errorCB){
	console.log(title,"title")
	console.log(username,"username")
	Usermodel.update({Username:username} ,
		{ $push: { Favourites: title } },function(err,result){
        if(err){
          console.log(err)
          errorCB(err);
        }
        console.log(result);
        successCB(result);
			 })

	}

	let removefavorite = function(title,username,successCB,errorCB){
		console.log(title,"title")
		console.log(username,"username")
		Usermodel.update({Username:username} ,
			{ $pull: { Favourites: title } },function(err,result){
	        if(err){
	          console.log(err)
	          errorCB(err);
	        }
	        console.log(result);
	        successCB(result);
				 })

		}

module.exports = {
    addusers,
		usercredentials,
		addfavorite,
		removefavorite
}
