const express = require('express');
const bodyParser = require('body-parser');
const path=require('path')
const app=express();
const port=3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/congkhai',express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
  console.log(path.join(__dirname, 'home.html'));
  res.sendFile(path.join(__dirname, 'home.html'))

})
app.listen(port,()=>{
  console.log('listening on port');
});