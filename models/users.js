var mongoose = require('mongoose');
var Schema = mongoose.Schema

var users = new Schema({
    Username : {type : String , unique : true },
    Password : String,
    Favourites : [String]
});
module.exports = mongoose.model('Users',users)
