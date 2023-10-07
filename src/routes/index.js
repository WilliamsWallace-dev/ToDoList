const express = require('express')

const router  = express.Router();

router.get('/', async (req,res)=>{
    console.log("adasda")
    try {
        // res.send("Olá")
        res.render('pages/index.ejs')
    } catch (error) {
        console.log("DEU ERRO")
    }
    
})

module.exports = router