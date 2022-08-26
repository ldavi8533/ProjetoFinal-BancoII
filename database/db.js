require('dotenv').config();

const neo4j = require('neo4j-driver');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
}

module.exports = mongoose;

// neo4j


const driver = new neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'neo4j1'));

const session = driver.session({
  database: 'neo4j',
});



console.log('Conectado ao banco neo4j');

const neo = async() => {
  const result = await session.run("MATCH (n) return n", {});


  session.close();

  //console.log(result.records.length);
  const node = [];

  result.records.forEach(res => {
    console.log(res.get(0).propreties)
    node.push({nome: res.get(0).propreties.nome, idade: res.get(0).propreties.idade.low})
})
}
console.log(node)
neo();