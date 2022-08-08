const { response } = require('express');
const res = require('express/lib/response');
const { replaceOne } = require('../models/pessoa');
const Pessoa = require('../models/pessoa');

const getPage = async function (request, response) {
    response.render('../views/index')
}

  module.exports = {getPage};