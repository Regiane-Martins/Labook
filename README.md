# Labook

![Badge](https://img.shields.io/badge/Status-Desenvolvimento-%237159c1?style=for-the-badge&logo=ghost)

### O Labook é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações.

# Índece

* [Requisições (Paths)](#requisições)
* [Exemplo de Requisições](#exemplo-de-requisições)
* [Documentação Postman](#documentação-postman)
* [Tecnologias](#tecnoligias)
* [Acesso ao Projeto](#acesso-ao-projeto)
* [Desenvolvedor(a)](#Desenvolvedor(a))

# Requisiçoes (Paths)

### Requisições de Usuários

* /users

#### Cadastro de usuário
* /users/signup

#### Login
* /users/login

### Requisições de Post

* /post
#### Editar e Deletar Posts
* /post/:id
#### Loke e Dislike
* /post/:id/like


# Exemplo de Requisições
### Requisições de usuários

* POST / users/signup: Cadastro de usuários.

```json
{
  "message": "CREATED",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjNDgxMzY1LWMzZWEtNDcyZS04NjA5LWY4YzBkMmI1OWE1YiIsIm5hbWUiOiJNaWd1ZWwiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjkyNzI4MDQ2LCJleHAiOjE2OTMzMzI4NDZ9.gRYSgaAh_46uDCDDdZ7YFBzPD8torSdWFbmsm1L9ekk"
}

```

* POST/ users/login : Login da conta, retornando token.
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4ZTI4NDY3LTI1YjYtNDc4YS04NzQ5LTY3YmZhNTY2Mzc0OCIsIm5hbWUiOiJNaWd1ZWwiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjkyNzI4MzY4LCJleHAiOjE2OTMzMzMxNjh9.ZikGVzfPr9xqJDiDKRKttpiCkVl7Xn17QIHb4f4omkM"
}
```

* GET /users: Retorna todos os usuário cadastrados.
```json
[
  {
    "id": "8a7019e2-c395-47a0-9e05-f6aa2421ece3",
    "name": "Regiane",
    "email": "regiane@email.com",
    "role": "NORMAL",
    "createAt": "2023-08-22T17:27:43.262Z"
  },
  {
    "id": "a8e28467-25b6-478a-8749-67bfa5663748",
    "name": "Miguel",
    "email": "miguel@email.com",
    "role": "NORMAL",
    "createAt": "2023-08-22T17:28:31.588Z"
  }
]
```
### Requisições de posts

* POST /posts: Criação de posts
```json
Created

``` 
* GET /posts: Buscar de todos os posts.
```json
[
  {
    "id": "c915b003-c428-4e22-ad95-7fadfe96cf4e",
    "content": "Deus é bom",
    "likes": 0,
    "dislikes": 0,
    "created_at": "2023-08-22T17:29:51.636Z",
    "updated_at": "2023-08-22T17:29:51.636Z",
    "creator": {
      "id": "8a7019e2-c395-47a0-9e05-f6aa2421ece3",
      "name": "Regiane"
    }
  }
]

```

* PUT /posts/:id : Edição do post por Id.
```json
{
  "message": "Updated"
}

```

* DELETE /posts/:id: Deleta posts por Id.
```json
{
  "message": "Post deletado."
}

```

* PUT /posts/:id/like: Like e Dislike em post via Id e token.
```json
OK

```

# Documentação do Postman
https://documenter.getpostman.com/view/26567220/2s9Y5YS2c7

# 🛠 Tecnologias

Na construção do projeto foram usadas as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [SQL](https://learn.microsoft.com/pt-br/sql/?view=sql-server-ver16)
- [SQLite](https://www.sqlite.org/docs.html)
- [Knex.js](https://knexjs.org/guide/)
- [Zod](https://zod.dev/)
- [Dotenv](https://www.dotenv.org/docs/)
- [JWT](https://jwt.io/introduction/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

# Acesso ao Projeto

### Pré Requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://github.com/Regiane-Martins/Labook.git>

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:3003 - acesse <http://localhost:3003>
```


# Desenvolvedor(a)

<img style="border-radius: 50%;" src="https://scontent.fbhz1-2.fna.fbcdn.net/v/t39.30808-6/358136904_6121985237926967_6522594282085333119_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEUlJv95Zte9M_8VSZ1ExresSaGbOpVPOWxJoZs6lU85baU8rQWK848_mIVHC1rlXTCNskCSF_ss1r6Ive_IVSw&_nc_ohc=SfrKS7N7t6YAX-S2ILP&_nc_ht=scontent.fbhz1-2.fna&oh=00_AfDsIOkG-QL67DdL9fUQOCJhWYv-dZ4OPqnj5fYzLr--rg&oe=64B3CBF6" width="100px;" alt=""/>
 <br />
 <sub style="font-size: 18px"><b>Regiane Martins</b></sub></a>
 <div>
 <br/>
<a href="https://www.linkedin.com/in/regiane-martins-henrique-6399ba65" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</div>