const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption')

const userSchema = new mongoose.Schema({
    email : String,
    password: String
})
userSchema.plugin(encrypt,{secret: process.env.SECRET, encryptedFields: ["password"] })
module.exports = mongoose.model('user',userSchema);