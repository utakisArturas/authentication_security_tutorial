require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const User = require("./models/user");
app.use(express.static("public"));
app.set('view engine', 'ejs');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(bodyParser.urlencoded({
    extended:true
}));

app.route("/")
.get((request,response)=>{
    response.render("home")
})
.post()
.put()
.patch()
.delete()

app.route("/login")
.get((request,response)=>{
    response.render("login")
})
.post(async (request,response)=>{
    const username = request.body.username;
    const password = request.body.password;
    const foundUser = await User.findOne({email:username})
    try {
        if(username !== foundUser.email && password !== foundUser.password){
            response.send(alert("Wrong username or password!"))
        }
        else{
            response.render("secrets")
        }
    } catch (error) {
        console.log(error);
    }
})
.put()
.patch()
.delete()

app.route("/register")
.get((request,response)=>{
    response.render("register")
})
.post(async (request,response)=>{
    await bcrypt.genSalt(saltRounds, (err, salt)=> {
         bcrypt.hash(request.body.password, salt, function(err, hash) {
            const user = new User({
                email: request.body.username,
                password: hash
            })
            try {
                user.save();
                response.render("secrets")
            } catch (error) {
                console.log(error);
            }
        });
    });
})
.put()
.patch()
.delete()

// app.route("/secret")
// .get()
// .post()
// .put()
// .patch()
// .delete()

app.route("/submit")
.get((request,response)=>{
    response.render("submit")
})
.post()
.put()
.patch()
.delete()

module.exports = app;
