# 📦 BeTalent Backend API

Este projeto é uma API RESTful desenvolvida como parte do teste técnico da BeTalent. A API permite o gerenciamento de usuários, clientes, produtos e vendas, com autenticação JWT para usuários logados.

## 🛠️ Tecnologias Utilizadas

- Node.js
- AdonisJS
- MySQL
- JWT para autenticação
- Docker

## 📋 Requisitos

- Node.js
- npm (ou yarn)
- MySQL
- Docker
- Docker Compose

## 🚀 Instalação e Configuração

### Passos para Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:Kaduh15/betalent-challenge-backend.git
   cd betalent-challenge-backend
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   TZ=UTC
   HOST=localhost
   PORT=3333
   NODE_ENV=development
   APP_KEY=uma_chave_secreta_gerada
   DB_HOST=db # Se for rodar localmente mude de 'db' para 'localhost'
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_DATABASE=nome_do_banco_de_dados
   ```

### 🐳 Rodar com Docker

1. **Execute o Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```

2. **Acesse a API:**
   A API estará disponível em `http://localhost:3333/`.

### 💻 Rodar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute as migrações:**
   ```bash
   node ace migration:run
   ```

3. **Inicie o servidor:**
   ```bash
   node ace serve --watch
   ```

4. **Acesse a API:**
   A API estará disponível em `http://localhost:3333/api`.

## 📚 Rotas da API

Na raiz do projeto tem um aqruivo `Betalent.json` que contém todas as rotas configuradas para usar
no [Bruno](https://www.usebruno.com/) um cliente de API onde pode testar todas as rotas.
Mas pode usar qualquer outro cliente http que preferir.

### 🔐 Usuários

- **Cadastro de usuário:**
  - **POST** `/signup`
  - Request Body:
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha"
    }
    ```
  - Response: `201 Created`

- **Login de usuário:**
  - **POST** `/login`
  - Request Body:
    ```json
    {
      "email": "usuario@example.com",
      "password": "senha"
    }
    ```
  - Response: `200 OK`, retorna token JWT

### 👥 Clientes

- **Listar todos os clientes:**
  - **GET** `/clientes`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Response: `200 OK`, retorna lista de clientes

- **Detalhar um cliente e suas vendas:**
  - **GET** `/clientes/{id}`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Response: `200 OK`, retorna detalhes do cliente e suas vendas

- **Adicionar um cliente:**
  - **POST** `/clientes`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Request Body:
    ```json
    {
      "name": "Nome do Cliente",
      "cpf": "12345678901",
      "address": {
        "street": "Rua Exemplo",
        "city": "Cidade Exemplo",
        "state": "Estado Exemplo",
        "zip": "12345-678"
      },
      "phone": "11123456789"
    }
    ```
  - Response: `201 Created`

- **Editar um cliente:**
  - **PUT** `/clientes/{id}`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Request Body:
    ```json
    {
      "name": "Nome Atualizado",
      "cpf": "12345678901",
      "address": {
        "street": "Rua Atualizada",
        "city": "Cidade Atualizada",
        "state": "Estado Atualizado",
        "zip": "12345-678"
      },
      "phones": [
        {
          "number": "987654321"
        }
      ]
    }
    ```
  - Response: `200 OK`

- **Excluir um cliente e suas vendas:**
  - **DELETE** `/clientes/{id}`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Response: `204 No Content`

### 🛒 Produtos

- **Listar todos os produtos:**
  - **GET** `/produtos`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Response: `200 OK`, retorna lista de produtos

- **Detalhar um produto:**
  - **GET** `/produtos/{id}`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Response: `200 OK`, retorna detalhes do produto

- **Criar um produto:**
  - **POST** `/produtos`
  - Request Body:
    ```json
    {
      "name": "Nome do Produto",
      "description": "Descrição do Produto",
      "price": 100.00
    }
    ```
  - Response: `201 Created`

- **Editar um produto:**
  - **PUT** `/produtos/{id}`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Request Body:
    ```json
    {
      "name": "Nome Atualizado",
      "description": "Descrição Atualizada",
      "price": 150.00
    }
    ```
  - Response: `200 OK`

- **Soft delete de um produto:**
  - **DELETE** `/produtos/{id}`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Response: `204 No Content`

### 💸 Vendas

- **Registrar uma venda:**
  - **POST** `/vendas`
  - Headers:
    ```
    Authorization: Bearer <token>
    ```
  - Request Body:
    ```json
    {
      "client_id": 1,
      "product_id": 1,
      "quantity": 2,
      "unit_price": 100.00,
      "total_price": 200.00,
      "date_time": "2024-07-19T10:00:00Z"
    }
    ```
  - Response: `201 Created`

## 📑 Documentação da API

A documentação completa da API pode ser acessada via Swagger [aqui](https://editor.swagger.io/?_gl=1*1p63kmo*_gcl_au*MTg1ODM1NjE3Ny4xNzIxNDExNzM5&_ga=2.55165419.1965308613.1721411735-1338233024.1721411735).
