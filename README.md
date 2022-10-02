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
