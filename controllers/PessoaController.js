const { response, request } = require('express');
const res = require('express/lib/response');
const { replaceOne } = require('../models/pessoa');
const Pessoa = require('../models/pessoa');
const objectId = require('mongodb').ObjectID;

const getPage = async function (request, response) {
    response.render('../views/index')
}

const getList = async function (request, response){
    response.render('../views/list')
}

const getPessoas = async (request, response)=>{

  const pessoas = await Pessoa.find({}, {_id: false, __v: false});
  response.status(200).send(pessoas);

}

const addPessoa = async (request, response) =>{

  const pessoa = new Pessoa(request.body);
  pessoa.save().then(()=>{
      response.status(200).send('Salvo com sucesso')
  }).catch(err=>{
      response.status(400).send("Erro ao salvar")
  });
}

const addList = (request, response) =>{
  Pessoa.find().then(function(pessoas){
  response.render('list', {pessoas: pessoas})
  })
}

const deletePessoa = async (request, response)=>{

  const result = await Pessoa.deleteOne({email: request.params.email});

  if(result.deletedCount){
      response.status(200).render('confirmdelete');
  }
  else{
      response.status(400).send('Usuário não encontrado')
  }
}

const atualizarPessoa = async(request, response)=>{
  Pessoa.findOne({email: request.params.email}).then((pessoas) =>{
    response.render('edit',{pessoas: pessoas})
  })
}

const confirmEdit = async(request, response)=>{
  Pessoa.findOne({email: request.body.email}).then((pessoas)=>{

    pessoas.nome = request.body.nome
    pessoas.filme = request.body.filme
    pessoas.comentario = request.body.comentario
    pessoas.save().then(()=>{
      response.render('confirmedit')
    })

  })
}

  module.exports = {getPage, getList, getPessoas, addPessoa, addList, deletePessoa, atualizarPessoa, confirmEdit};