const express = require('express')
const PersonModel=require('../models/person')
const router=express.Router()

const pageSize=2
router.get('/', function(req, res,next){
    let page=Number.parseInt(req.query.page)
    page=page<=0||Number.isNaN(page)?1:page;
    if(req.query.page){
        const skip=(page-1)*pageSize

        PersonModel.find({}).skip(skip).limit(pageSize).then(
            (data)=>{
                
            PersonModel.countDocuments({}).then(total=>{
                res.json({total,data,totalPage:Math.ceil(total/pageSize)})
            }).catch((err)=>{})
            
            })
            .catch(err=>{res.status(400).json({message:'err'})})
    }else{
        PersonModel.find({}).then((data)=>{res.json(data)}).catch(err=>{res.status(400).json({message:'err'})})
    }
})

router.post('/', function(req, res){
    PersonModel.create({name:req.body.name,password:req.body.password})
    .then((data)=>{res.json(data)})
    .catch(err=>{res.status(400).json({message:'err'})})
})

router.put('/:id', function(req, res){
    const id=req.params.id
    console.log(id);
    PersonModel.findByIdAndUpdate(id,{password:req.body.password})
    .then((data)=>{
        console.log('cap nhat thanh cong');
        res.json(data)
    })
    .catch(err=>{res.status(400).json({message:'cap nhat that bai'})})
})

router.delete('/:id', function(req, res,next){
    const id=req.params.id
    console.log(id);
    PersonModel.deleteOne({_id:id})
    .then((data)=>{
        console.log('xoa thanh cong');
        res.json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({message:'xoa that bai'})})
})

router.patch('/', function(req, res){})


module.exports =router