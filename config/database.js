//Importação e atribuição da promise da aplicação para a promise do node
//A linha de código abaixo é somente se NÃO estiver utilizando o type : 'module' no package.json
const mongoose = require('mongoose')
// import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
//Conectamos o banco de dados mongoDB a aplicação
mongoose.connect('mongodb://127.0.0.1/todo-list', {useNewUrlParser : true,useUnifiedTopology:true})
    .then(()=>console.log('Conectado ao MongoDB'))
    .catch((err)=>console.log(err))
