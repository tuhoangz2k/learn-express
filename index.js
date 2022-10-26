const express = require('express');
const bodyParser = require('body-parser');
const path=require('path')
const cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')
const personRouter= require('./routers/personRouter')
const PersonModel=require('./models/person')
const connectdb= require('./db/connectDB')
const session = require('express-session')
const app=express();
const port=3002;
connectdb()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 5000 }
}))
app.use(cookieParser())

app.get('/',(req,res,next) => {
res.sendFile(path.join(__dirname,'demo-cookies.html'))
})

app.get('/demo', function(req, res, next) {
  console.log(req.session);
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.get('/logout',(req, res, next)=>{
  req.session.destroy()
  res.json('log out')
})
app.use('/user',personRouter)
app.listen(port,()=>{
  console.log('listening on port');
});