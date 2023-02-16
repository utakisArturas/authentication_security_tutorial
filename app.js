//jshint esversion:6
const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const bodyParser = require('body-parser');
const router = require("./routes")
const mongoose = require('mongoose');
mongoose.set("strictQuery",true);

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(router);

mongoose.connect("mongodb://127.0.0.1:27017/users",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "))
db.once("open",()=>{
    console.log('Connected to mongo db');
});


app.listen(port,()=>{
    console.log(process.env.SECRET);
    console.log(`Server running on port : ${port}`);
});

