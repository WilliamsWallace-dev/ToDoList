

const express = require('express')
const CheckList = require('../models/checklist.js')
const  Task = require('../models/task.js');
const checklist = require('../models/checklist.js');

const router = express.Router();

router.get('/', async (req,res)=>{
    const checklists = await CheckList.find()
    try {
        res.render('pages/checklist/index',{checklists : checklists})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/new', (req,res)=>{
    const checklist = new CheckList()
    try {
        res.status(200).render('pages/checklist/newAndUpdate',{checklist : {...checklist}, url : '/checklist/?_method = post' ,type : "checklist"})
    } catch (error) {
        console.log("errro no new")
        res.status(400).send("error")
    }
})

router.get('/edit/:id', async(req,res)=>{   
    try {
        const checklist = await CheckList.findById(req.params.id)
        res.status(200).render('pages/checklist/newAndUpdate',{checklist : checklist ,url : `/checklist/${req.params.id}/?_method=put`,type : "checklist"})
    } catch (error) {
        res.status(422).json(error)
    }
})

router.get('/show/:id', async (req,res)=>{
    try {
        const checklist = await CheckList.findById(req.params.id).populate('tasks')
        console.log(checklist.tasks)
        res.status(200).render('pages/checklist/show',{checklist : checklist})
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get('/:id', async (req,res)=>{

    try {
        const checklist = await CheckList.findById(req.params.id)
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})


router.post('/', async (req,res)=>{
     const {name} = req.body.checklist;
     const checklist = new CheckList({name : name})
     try {
        await checklist.save()
        res.status(200).redirect('/checklist')
     } catch (error) {
        res.status(422).json(error)
     }
    // const {name} = req.body
    // let checklist = new CheckList({name})
    // try {
    //     await checklist.save()
    //     res.status(200).json(checklist)
    // } catch (error) {
    //     res.status(422).json(error)
    // }
})


router.put('/:id', async(req,res)=>{
    // console.log("put")
    const {name} = req.body.checklist
    try {
        await CheckList.findByIdAndUpdate(req.params.id,{name})
        res.status(200).redirect('/checklist')
    } catch (error) {
        res.status(422).json("error")
    }
})

router.delete('/:id', async (req,res)=>{
    // console.log("delete")
    try {
        await CheckList.findByIdAndRemove(req.params.id)
        res.status(200).redirect('/checklist')
    } catch (error) {
        res.status(422).json("error")
    }
})




module.exports = router