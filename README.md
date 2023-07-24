# labecommerce-backend

* Projeto Labecommerce Back-end
Este é o projeto do Back-end do Labecommerce, uma aplicação de e-commerce fictícia. Neste projeto, foi desenvolvida uma API RESTful que fornece acesso aos recursos de usuários, produtos e compras através de diferentes endpoints. Esse é um projeto de estudo com objetivo de praticar matérias da base de backend como por exemplo: NodeJS - Typescript - Express - SQL e SQLite - Knex - Postman.



* Informações: 
- O banco de dados utilizado é o SQLite, e o arquivo labecommerce.db.
- As rotas estão protegidas com tratamento de erros para retornar respostas adequadas em caso de falhas.
- Os dados das requisições são validados para garantir que estejam corretos antes de serem processados e inseridos no banco de dados.
- Este é um resumo dos principais endpoints disponíveis neste projeto. Certifique-se de verificar o código-fonte para obter mais detalhes sobre a implementação e o funcionamento de cada rota.
- Aproveite o Labecommerce Back-end e fique à vontade para enviar sugestões de melhorias ou novas funcionalidades pelo email: "sugestão@lbc.com"



* Endpoints
1. GET /users
Este endpoint retorna uma lista de todos os usuários cadastrados no sistema.

2. GET /products
Este endpoint retorna uma lista de todos os produtos cadastrados no sistema. Caso seja fornecido um parâmetro de consulta name, ele irá filtrar os produtos pelo nome.

3. GET /purchases/:id?
Este endpoint retorna uma lista de compras realizadas no sistema. Se o parâmetro id for fornecido, irá retornar apenas a compra correspondente a esse ID.

4. POST /users
Este endpoint permite cadastrar um novo usuário no sistema. É necessário enviar um objeto JSON com as propriedades id, name, email e password.

5. POST /products
Este endpoint permite cadastrar um novo produto no sistema. É necessário enviar um objeto JSON com as propriedades id, name, price, description e image_url.

6. POST /purchases
Este endpoint permite realizar uma nova compra no sistema. É necessário enviar um objeto JSON com as propriedades id, buyer (ID do usuário que realizou a compra) e products (uma lista de objetos contendo as propriedades id do produto e quantity).

7. PUT /users/:id
Este endpoint permite atualizar as informações de um usuário existente. É necessário fornecer o ID do usuário na URL e enviar um objeto JSON com as propriedades que deseja atualizar.

8. PUT /products/:id
Este endpoint permite atualizar as informações de um produto existente. É necessário fornecer o ID do produto na URL e enviar um objeto JSON com as propriedades que deseja atualizar.

9. DELETE /users/:id
Este endpoint permite excluir um usuário do sistema. É necessário fornecer o ID do usuário na URL.

10. DELETE /products/:id
Este endpoint permite excluir um produto do sistema. É necessário fornecer o ID do produto na URL.

11. DELETE /purchases/:id
Este endpoint permite excluir uma compra do sistema. É necessário fornecer o ID da compra na URL.


* Documentação com os passos a passos de todos os end-points:
https://documenter.getpostman.com/view/27736274/2s946maVR9

