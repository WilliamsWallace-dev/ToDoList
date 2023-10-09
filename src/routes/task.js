const express = require('express')
const methodOverride = require('method-override')

const CheckList = require('../models/checklist')
const Task = require('../models/task')

const checklistRouterDepedent = express.Router()
const router = express.Router()
// const router = express.Router()

checklistRouterDepedent.get('/:id/task/new', async (req,res)=>{
    let errors = null
    try {
        const checklist = await CheckList.findById(req.params.id);
        res.status(200).render('pages/checklist/newAndUpdate',{checklist : checklist,url: `/checklist/${req.params.id}/task/new?_method=post`,type : "task",errors})
    } catch (error) {
        // res.status(400).json(error)
        let errors = error.errors
        res.status(400).render('pages/error/index',{errors})
    }
})

checklistRouterDepedent.post('/:id/task/new',async(req,res)=>{
    const {name} = req.body.task
    const checklist = await CheckList.findById(req.params.id)
    try {
        
        const task = new Task({name : name,checklist : checklist._id})
        await task.save()
        checklist.tasks.push(task)
        await checklist.save()
        res.status(200).redirect(`/checklist/show/${req.params.id}`)
    } catch (error) {
        // res.status(422).json(error)
        let errors = error.errors
        // res.status(422).render('pages/error/index',{errors})
        res.status(422).render('pages/checklist/newAndUpdate',{checklist : checklist,url: `/checklist/${req.params.id}/task/new?_method=post`,type : "task",errors})
        
        
    }   

})

router.delete('/:id', async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.status(200).redirect(`/checklist/show/${task.checklist}`)
    } catch (error) {
        // res.status(400).json(error)
        let errors = error.errors
        res.status(400).render('pages/error/index',{errors})
    }

})

router.put('/:id',async(req,res)=>{
    // console.log("taksPut")
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body.task,{new : true})
        res.status(200).json(task)
    } catch (error) {
        // res.status(422).json(error)
        let errors = error.errors
        res.status(422).render('pages/error/index',{errors})
    }

})

// router.put('/:id', async(req,res)=>{

//     try {
//         const task = await Task.findByIdUpdate(req.params.id,req.body.task)
//         res.status(200).json(task)
//     } catch (error) {
//         res.status(422).json(error)
//     }

// })



module.exports = {checklistDepedent : checklistRouterDepedent,
                  router : router
                }