# crypto-pocket-server #1
 
Crypto Pocket is an app to take care of your cryptocurrency wallets

Back-end project for Crypto Pocket app (**mobile** and **web**)!

# About the project

This project has been created in the third module at Ironhack São Paulo - Web Development Bootcamp.

Simple REST API to allow for complete CRUD  at the endpoint:
https://xxxxxx.herokuapp.com


# Usage

Complete CRUD functionality

## User Routes

**Create**

    POST /users/create-user

**Login**

    POST /users/login

**Get Current User**

    GET /users/profile
    
**Update Account**

    PATCH /users/profile/update
    
**Delete Account**

    DELETE /users/profile/disable-account
    
**Active Account**

    PATCH /users/profile/active-account

## Enter information regarding the purchase of crypto assets Routes

**Create Crypto Currencies**

    POST /

  

**Delete Crypto Currencies**

    DELETE /crypto/:idCrypto/disable-business


**Update Crypto Currencie Info**

    PATCH /crypto/cryptocurrencie/update/:id

**Delete Crypto Currencie**

    DELETE /crypto/cryptocurrencie/:id

**Input Product**

    PATCH /products/input-product

**Output Product**

    PATCH /products/output-product


    
# Developers GitHub

- [Fabio Gomes](https://github.com/fabiolpgomes)
- [Bruno Apostolo](https://github.com/brunoapostolo)

# crypto-pocket-client

Front-end for Crypto Pocket control app (**mobile** and **web**)!

[Click here](https://github.com/jotavkf/kols-client)

# Presentation

[Click here](https://www.canva.com/design/DAE6l1qSFZI/xZhufOFHCylg5A8tYSolLw/view?utm_content=DAE6l1qSFZI&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton)

## Install
To run the application on your localhost, clone the repo and then execute the commands below:

**Note: Don't forget to create .env and update like exemple.env**

- <code>$ git clone https://github.com/karenokasaki/kols-server</code>
- <code>$ cd kols-server npm install</code>
- <code>$ npm run start</code>
