const { response } = require('express');
const res = require('express/lib/response');
const { replaceOne } = require('../models/pessoa');
const Pessoa = require('../models/pessoa');

const getPage = async function (request, response) {
    response.render('../views/index')
}

const getPessoas = async (request, response)=>{

  const pessoas = await Pessoa.find({}, {_id: false, __v: false});
  response.status(200).send(pessoas);

}

  module.exports = {getPage, getPessoas};