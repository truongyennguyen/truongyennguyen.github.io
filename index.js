var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const fs = require('fs');

var account;

app.use(express.static('./public'));

app.set("view engine", "ejs");
app.set("views", "./views");

var server = require('http').Server(app);

server.listen(3000);


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/handlelogin", urlencodedParser, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    const rawdata = fs.readFileSync('data/fakedata.json');  
    const accounts = JSON.parse(rawdata);  

    for(let i = 0; i < accounts.accounts.length; i++){
        if(accounts.accounts[i].username === username && accounts.accounts[i].password === password){
            account = accounts.accounts[i];
            res.redirect('/stream');
            return;
        }
    }

    
});

app.get('/stream', (req, res) => {
    if(account){
        res.render('stream', {account});
    }
});



 