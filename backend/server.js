const express=require('express');
const app=express();
const session=require('express-session');
const body_parser=require('body-parser');
const {home,login,logout}=require('./controller/controller');
const cors=require('cors');
require("dotenv").config({path:'./.env'});
const pgstore=require('connect-pg-simple')(session);

const sessionStore=new pgstore({
    conString:process.env.PGURL
})

app.set('view engine','ejs');
app.set('views','../frontend');
app.use(cors());
app.use(express.static('../frontend'))
app.use(body_parser.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store:sessionStore,
}));
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.get('/',home);
app.post('/login',login);
app.get('/logout',logout);
app.listen(process.env.PORT,()=>{
    console.log("server listening on "+process.env.PORT);
})