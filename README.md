# Crypto Pocket #2
 
Crypto Pocket is an app to take care of your cryptocurrency wallets.

Back-end project for Crypto Pocket app (**mobile** and **web**)!

# About the project

The Crypto Pocket app was created to facilitate end-user cryptocurrency management. With a simple and straightforward 'interface', the user will be able to know the value of his asset position in real time. The application has the management of all the main currencies of the market that you make contributions, being possible to follow the performance of your investments.

This project has been created in the third module at Ironhack São Paulo - Web Development Bootcamp.

Simple REST API to allow for complete CRUD  at the endpoint:
https://cryptopocket.netlify.app/


# Features - MERN stack

Complete CRUD functionality

## User Routes


**Create** criar usuário

    POST /users/sign-up

**Activate account** Activate account via an email link

   GET/users/activate-account/:idUser

**Login** Generate tokin when login user

    POST /users/login

**Get Current User**  View all information of the user through token validation

    GET /users/profile
    
**Edit user data** Edit data of the user

  PUT /users/edit

**Desactivate Account**  Desactivate account of the user.

    GET /users/profile/disable-account/:idUser
    
**Delete Create Wallet** Create a new wallet for investments in crypto

    PUT /wallets/createwallet

**Edit wallet** Change the name of the wallet

    PUT /wallets/editwallet/:idWallet
    
**Get all wallets** Show all wallets of the user by token validation

   GET /wallets/getallwallets

**Get specific wallet** Show one wallet with all crypto informations

   GET /wallets/getonewallet/:idwallet


**Create a new investment** Buy a new cryptocoin using data from an API 

   POST cryptotrade/purchasecoin/:idWalet
   
   
**Update all crypto worth** Update the value of each coin of the wallet 

   GET cryptotrade/updatingcrypto/:idWallet

**Sell the crypto** Delete the crypto coin from the wallet and put the profit of the trade in the user info 

   GET cryptotrade/selling/:idCrypto

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
