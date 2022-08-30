const neo4j = require('neo4j-driver');
const driver = new neo4j.driver('neo4j+s://c1f044f3.databases.neo4j.io:7687', neo4j.auth.basic('neo4j', 'msM9Rw5iYOe_JKs8kGz4nz8UJueZcsc-7np2FA_aKB8'));

module.exports = driver;