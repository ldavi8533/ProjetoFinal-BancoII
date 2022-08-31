require('dotenv').config();
const neo4j = require('neo4j-driver');
const driver = new neo4j.driver(`neo4j+s://${process.env.NEO4J_HOST}`, neo4j.auth.basic(`${process.env.NEO4J_USER}`, `${process.env.NEO4J_PASSWORD}`));
console.log("Neo4j conectado!")

module.exports = driver;