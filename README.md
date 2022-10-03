# Crypto Pocket #2
 
Crypto Pocket is an app to take care of your cryptocurrency wallets.

Back-end project for Crypto Pocket app (**mobile** and **web**)!

# About the project

The Crypto Pocket app was created to facilitate end-user cryptocurrency management. With a simple and straightforward 'interface', the user will be able to know the value of his asset position in real time. The application has the management of all the main currencies of the market that you make contributions, being possible to follow the performance of your investments.

This project has been created in the third module at Ironhack São Paulo - Web Development Bootcamp.

Simple REST API to allow for complete CRUD  at the endpoint:
https://xxxxxx.herokuapp.com


# Features - MERN stack

Complete CRUD functionality

## User Routes


**Create** criar usuário

    POST /users/sign-up

**Activate account** Ativa o usuário por um link enviado via email

   GET/users/activate-account/:idUser

**Login** Cria o usuário e o TOKEN

    POST /users/login

**Get Current User**  Permite o acesso ao perfil por meio do Token

    GET /users/profile
    
**Edit user data** Edita os dados de cadastro do usuário

  PUT /users/edit

**Desactivate Account**

    GET /users/profile/disable-account/:idUser
    
**Delete Create Wallet** Cria nova carteira de investimento

    PUT /wallets/createwallet

**Edita o nome da carteira**

    PUT /wallets/editwallet/:idWallet

**Create a new investment** Faz um novo investimento para a carteira, fazendo um trade de moedas

    DELETE cryptotrade/purchasecoin/:idWalet


    
# Developers GitHub

- [Fabio Gomes](https://github.com/fabiolpgomes)
- [Bruno Apostolo](https://github.com/brunoapostolo)

# Crypto Pocket CLIENT

Front-end for Crypto Pocket control app (**mobile** and **web**)!

[Click here](https://github.com/fabiolpgomes/crypto-pocket-client)

# Presentation

[Click here](https://www.canva.com/design/DAE6l1qSFZI/xZhufOFHCylg5A8tYSolLw/view?utm_content=DAE6l1qSFZI&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton)

## Install
To run the application on your localhost, clone the repo and then execute the commands below:

**Note: Don't forget to create .env and update like exemple.env**

- <code>$ git clone (https://github.com/fabiolpgomes/crypto-pocket-server)</code>
- <code>$ cd crypto-pocket-server</code>
- <code>$ npm install</code>
- <code>$ npm run start</code>
