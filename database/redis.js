require('dotenv').config();
const redis = require('redis');

const client = redis.createClient({
    url: "redis://localhost:6379",
    },
    console.log("Redis conectado!")
);

(async ()=>{
    await client.connect();
})();

module.exports = client;