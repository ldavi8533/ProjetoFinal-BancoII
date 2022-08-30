const neo4j = require('neo4j-driver');
const driver = new neo4j.driver('neo4j+s://c1f044f3.databases.neo4j.io:7687', neo4j.auth.basic('neo4j', 'msM9Rw5iYOe_JKs8kGz4nz8UJueZcsc-7np2FA_aKB8'));

const get_nodes = async function() {
    let session = driver.session();
    const num_nodes = await session.run("MATCH (n) RETURN (n)", {  
    });
    session.close();
    console.log("RESULT", (!num_nodes ? 0 : num_nodes.records.length));
    return(!num_nodes ? 0 : num_nodes.records.length);
}

const create_user = async function(name){
    let session = driver.session();
    let user = "No User Was  Created"
    try {
        user = await session.run("MERGE (n:user {name: $id}) RETURN n", {
            id: name          
        });
    } 
    catch (err){
        console.log(err)
        return user;
    }
    return user.records[0].get[0].properties.name;
}

module.exports = {get_nodes, create_user};