require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
}

<<<<<<< HEAD
module.exports = mongoose;
=======
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
    node.push({nome: res.get(0).propreties.nome})
})
}
console.log(node)
neo();
>>>>>>> f880d6c8a391c34310510335273edfc1b2d8a735
