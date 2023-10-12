# Store Manager
Descrição
Este repositório contém a API Store Manager, uma aplicação construída utilizando Node.js e o framework Express.js. A API segue a arquitetura em camadas para gerenciamento de vendas, permitindo a criação, visualização, exclusão e atualização de produtos e vendas. Utiliza um banco de dados MySQL para a gestão eficiente dos dados, seguindo o padrão RESTful.

## Rotas
A seguir estão listadas as rotas disponíveis na API:

## GET `/products`
Retorna uma lista de todos os produtos com status 200.

## GET `/products/:id`
Se um produto com o ID presente na URL existir, retorna o produto correspondente.

## GET `/sales e GET /sales/:id`
Retorna informações sobre todas as vendas ou uma venda específica pelo seu ID.

## POST `/products`
Cadastra um novo produto. O corpo da requisição deve seguir o formato abaixo:
```json
{
  "name": "ProdutoX"
}
```
## POST `/sales`
Cadastra uma nova venda. O corpo da requisição deve seguir o formato abaixo:
```json
[
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]
```

## PUT `/products/:id`
Atualiza um produto com base no ID presente na URL. O corpo da requisição deve seguir o formato abaixo:
```json
{
  "name": "Martelo do Batman"
}
```
## DELETE `/products/:id`
Deleta o produto com o ID presente na URL.

## DELETE `/sales/:id`
Deleta a venda com o ID presente na URL.

## PUT `/sales/:saleId/products/:productId/quantity`
Atualiza a quantidade de um produto em uma venda específica. O corpo da requisição deve seguir o formato abaixo:
```json
{
  "quantity": 20
}
```

GET /products/search
Realiza uma busca de produtos com base nos parâmetros de consulta. Exemplo de uso:
```bash
http://localhost:PORT/products/search?q=Martelo
```

## Como Iniciar a Aplicação
Para iniciar a aplicação, execute o seguinte comando no terminal:
```bash
docker-compose up -d
```
A aplicação estará rodando na porta 3001.

## Ferramentas e Plugins

A Store Manager API pode ser testada e utilizada de forma eficiente com a ajuda das seguintes ferramentas e plugins:

- **Testes da API:** A aplicação possui testes implementados utilizando Chai e Sinon, proporcionando uma validação robusta das funcionalidades da API.
- **Banco de Dados:** A Store Manager API utiliza um banco de dados MySQL que está configurado para rodar na porta `3306`.
- **Cliente HTTP:** Recomenda-se o uso de clientes HTTP como [ThunderClient](https://www.thunderclient.io/), [Postman](https://www.postman.com/) ou o comando `curl` para testar e interagir com as diferentes rotas da API.
- **Docker:** A aplicação pode ser facilmente containerizada e gerenciada usando o Docker, permitindo a criação e execução de contêineres de forma eficiente.

Utilize essas ferramentas para explorar, testar e otimizar a Store Manager API de acordo com suas necessidades e requisitos.

