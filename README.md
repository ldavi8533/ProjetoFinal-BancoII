# Banco de Dados II


Projeto voltado para a disciplina de Bando de Dados II, que utiliza diversos bancos para armazenar e gerenciar comentários sobre filmes em geral


------------------------------------------------------------------------------
Passos para execultar o projeto na sua máquina
------------------------------------------------------------------------------

1. Clonar repositório;
2. Criar .env inserir as seguintes informações de acordo com seus dados:

```
MONGO_HOST = localhost
MONGO_PORT = 27017
MONGO_DATABASE = projeto
API_PORT = 3000
REDIS_HOST = {host do redis cloud}
REDIS_PORT = {porta do redis cloud}
REDIS_USER = {usuário, padrão: default}
REDIS_PASSWORD = {senha do usuário}
NEO4J_HOST = localhost
NEO4J_USER = neo4j
NEO4J_PASSWORD = {senha do usuário}
```

3. iniciar os containers, mongo e redis-server.

4. use:
```
npm i
```

```
npm start
```
------------------------------------------------------------------------------
