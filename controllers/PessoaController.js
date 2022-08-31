const { response, request } = require('express');
const res = require('express/lib/response');
const { replaceOne } = require('../models/pessoa');
const Pessoa = require('../models/pessoa');
const objectId = require('mongodb').ObjectID;
const client = require('../database/redis');
const driver = require('../database/neo4j')

const cachePessoa = async (request, response) =>{

  const email = request.params.email;
  const result = await client.get(email);

  if(result != null){
      const pessoa = JSON.parse(result);
      response.status(200)
      await client.get(pessoa)
      response.send(pessoa)
      
  }else{
      const pessoa = await Pessoa.findOne({where:{
          email:email
      }});
  
      if(pessoa == null){
          response.status(200).send('Usuário não encontrado');
      }else{
          await client.set(email, JSON.stringify(pessoa),{EX: 3600});
          response.status(200).send(pessoa);
      }
  }
  
}

const getPage = async function (request, response) {
    response.render('../views/index')
}

const getPessoas = async (request, response)=>{

  const pessoas = await Pessoa.find({}, {_id: false, __v: false});
  response.status(200).send(pessoas);

}

const addPessoa = async (request, response) =>{

  const pessoa = new Pessoa(request.body);
  pessoa.save().then(()=>{
      response.status(200).send('Salvo com sucesso')
      createUser(request.body.nome)
      createFilme(request.body.filme)
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

const createUser = async function(nome){
  let session = driver.session();
  let user = "No User Was  Created"
  try {
      user = await session.run("CREATE (n:user {nome: $nome}) RETURN n", {
          nome: nome        
      });
  } 
  catch (err){
      console.log(err)
      return user;
  }
  return user.records[0]._fields[0].properties.nome;
}

const createFilme = async function(filme){
  let session = driver.session();
  let movie = "No User Was  Created"
  try {
      movie = await session.run("CREATE (n:movie {filme: $filme}) RETURN n", {
          filme: filme        
      });
 
  } 
  catch (err){
      console.log(err)
      return movie;
  }
  return movie.records[0]._fields[0].properties.filme;
}

  module.exports = {cachePessoa, getPage, getPessoas, addPessoa, addList, deletePessoa, atualizarPessoa, confirmEdit, createUser, createFilme};