const express = require('express');
const bodyParser = require('body-parser');
const path=require('path')
const cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken')
const personRouter= require('./routers/personRouter')
const PersonModel=require('./models/person')
const connectdb= require('./db/connectDB')
const app=express();
const port=3002;
connectdb()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'lp.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
})
app.use('/public',express.static(path.join(__dirname, 'public')))


app.get('/home',(req, res,next)=>{
  var token=req.cookies.token;
  try {
  var decode=jwt.verify(token,'wiburach')
  } catch (error) {
    res.redirect('/login')
  }
  PersonModel.findById(decode._id)
  .then((data)=>{
    if(data.role==='manager'){
     next();
    }else{
    return res.redirect('/login')
    }
  })
  .catch((err)=>{res.json('err')})
  
} ,(req, res, next) => {
  res.sendFile(path.join(__dirname, 'home.html'))
})
app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'login.html'))
})

app.post('/login', (req, res, next) => {
  PersonModel.findOne({name: req.body.username,password: req.body.password})
  .then((data)=>{
    if(data){
      const token=jwt.sign({_id:data._id},'wiburach')
      return res.json({message:'successful',token})
    }else{
      return res.json('dang nhap that bai')
    }
    
  })
  .catch((err)=>{res.status(404).send('khong tim thay')})
})


function checklogin(req,res, next){
  try {
    const token=req.cookies.token
    const result=jwt.verify(token,'wiburach')
    console.log(req.body.token);
    
    PersonModel.findById(result._id)
    .then((data)=>{
      if(data){
        req.data=data
        console.log(data);
        next()
      }else{
        res.redirect('/login')
      }
    })
    .catch((err)=>{res.json('err');})
    
  } catch (error) {
    return res.json('you need to login')
  }
}

function checkTask(req, res, next){
const role =req.data.role
console.log(role);
if(role==='student'||role==='teacher'||role==='manager'){
  next()
}else{
  res.json('not permitson')
}
}

function checkStudentPage(req, res, next){
  const role =req.data.role
  console.log('student',role);
  if(role==='teacher'||role==='manager'){
    next()
  }else{
    res.json('not permitson')
  }
  }


  function checkTeacherPage(req, res, next){
    const role =req.data.role
    console.log('student',role);
    if(role==='manager'){
      next()
    }else{
      res.json('not permitson')
    }
    }

app.patch('/edit', (req, res, next)=>{
  const token=req.headers.cookie.split('=')[1]
  try {
  var decode=jwt.verify(token,'wiburach')
  } catch (error) {
    res.redirect('/login')
  }
  PersonModel.findById(decode._id)
  .then((data)=>{
    if(data.role==='manager'){
     next();
    }else{
    return res.redirect('/login')
    }
  })
  .catch((err)=>{res.json('err')})
  next()
},(req, res, next)=>{
  res.json('update successful')
})

app.use('/task',checklogin,checkTask,(req, res, next)=>{
  const token=req.data;
  res.json('all task')
})

app.use('/student',checklogin,checkStudentPage,(req, res, next)=>{
  try {
    const token=req.cookies.token
    const result=jwt.verify(token,'wiburach')
    console.log(req.body.token);
    req.data=result
    if(result)next();
  } catch (error) {
    return res.json('you need to login')
  }
},(req, res, next)=>{
  const token=req.data;
  PersonModel.findById(token._id)
  .then((data)=>{
  res.json({name:data.name,description:'student page'})
  })
  .catch((err)=>{res.json('err');})
})



app.use('/teacher',checklogin,checkTeacherPage,(req, res, next)=>{
  const token=req.data;
  PersonModel.findById(token._id)
  .then((data)=>{
  res.json({name:data.name,description:'teacher page'})
  })
  .catch((err)=>{res.json('err');})
})

app.use('/user',personRouter)
app.listen(port,()=>{
  console.log('listening on port');
});