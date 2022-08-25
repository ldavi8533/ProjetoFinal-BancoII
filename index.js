require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const handlebars = require('express-handlebars');

app.use(express.json());

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))

app.set('view engine', 'handlebars')

app.use(express.static('assets/'))

app.use(express.urlencoded({extended: false}))

const pessoaController = require('./controllers/PessoaController');

app.get('/', pessoaController.getPage);

app.get('/list', pessoaController.getList);

app.get('/pessoas', pessoaController.getPessoas);

app.post('/pessoas', pessoaController.addPessoa);

app.post('/list', pessoaController.addList);

app.get('/delete/:email', pessoaController.deletePessoa);

app.get('/edit/:email', pessoaController.atualizarPessoa);

app.post('/edit', pessoaController.confirmEdit)

app.listen(process.env.API_PORT, ()=>{
    console.log(`API rodando na porta ${process.env.API_PORT}`);
});