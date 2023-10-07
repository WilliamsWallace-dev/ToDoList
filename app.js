const express = require('express')
require('./config/database')


const path = require('path')
const methodOverride = require('method-override')

const RootRouter = require('./src/routes/index')
const checklistRouter = require('./src/routes/checklist.js')
const taskRouter = require('./src/routes/task')

const CheckList = require('./src/models/checklist.js')
const Task = require('./src/models/task.js')


const app = express();
app.use(express.json())
//Da mesma maneira que precisamos do comando acima para que seja reconhecido dados json enviado pela requisição
//precisamos do comando abaixo para que a requisição reconheca dados enviados por um formulário
app.use(express.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname, "public"))); //Comando de configuração comum em aplicações Express
//Tal comando diz para o express reconhecer arquivos na public como estático e não como parte de uma rota dinâmica

//Como o HTML só da suporte para enviar formulário interno com GET e POST
//A seguinte linha de código irá permitir enviarmos com PUT/PACH/DELETE
app.use(methodOverride('_method'))

//a biblioteca methodOverride atual sobrescrevendo o post do formulário, pois o método padrão do form é post
//No caso em que estamos redirecionando a aplicação direto de um link para um requisição
//o padrão para esse redirecionamento é a op. GET, dessa maneira, temos de indicar para o methodOverride
//Sobrescrever não só o POST, mas também o GET, quando for utilizado.
//Nesse caso, estamos utilizando o ?_method na declaração do href do link
app.use(methodOverride('_method',{methods : ['POST','GET']}))

app.set('views', path.join(__dirname,'src/views'))
app.set('view engine','ejs')

app.use('/',RootRouter)
app.use('/checklist',checklistRouter)
app.use('/checklist',taskRouter.checklistDepedent)
app.use('/task',taskRouter.router)



app.listen(3000,()=>{
    console.log('O servidor foi inicializado')
})



// const log = (req,res,next)=>{
    //         console.log(req.body)
    //         console.log(Date.now())
    //         // res.send('Verificamos a existÊncia de json')
    //         next();
    //     }
    
    // app.use(log)
    
    // app.get('/',(req,res)=>{
    //     res.json({
    //                 title : 'Tarefa X',
    //                 done : true,
    //             })
    // }) // chamada do root