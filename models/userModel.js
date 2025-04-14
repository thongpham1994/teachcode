
 var mongoose = require('../connection/connection');

 var Schema = mongoose.Schema;
 var User = new Schema({
     name: { type: String, required: true },
     username: { type: String},
     description: { type: String},     
     birthday: { type: Date, default: Date.now }
 });
 
 var UserModel = mongoose.model('User', User);
 
 module.exports = UserModel;