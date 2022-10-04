const express = require("express");
const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const CryptocurrencieModel = require("../models/CryptoCurrencie.model");

const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateToken = require("../config/jwt.config");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

//Configurando o Email
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    secure: false,
    user: "bruno.apos13.85wdftironhack_bruno.apos13@outlook.com",
    pass: "kkklmpkkklmp@3713132",
  },
});

// Sign up -  1º rota: Criar um user (Login com senha)
router.post("/sign-up", async (req, res) => {
  try {
    const { password, email } = req.body;
    //checando se a senha existe e se ela passou na RegEx

    if (
      !password ||
      !password.match(
        //checando se a senha tem os pré requisitos de segurança
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
      )
    ) {
      return res.status(400).json({
        message: "Password does not have the necessary requirements.",
      });
    }

    //gerar o salt
    const salt = await bcrypt.genSalt(saltRounds); //chamar a funcao hash da biblioteca e passar a senha juntamente com o salt criado
    console.log(salt);

    //gerar passwordHash com a senha enviada pelo usuário mais o salt criado
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    //criar a entrada no banco e dados adicionando a senha hasheada no campo: passwordHash
    const user = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    //deletar o campo da senha antes de devolver o usuario para a response
    delete user._doc.passwordHash;

    //envio de email, configurando o email que será enviado!
    const mailOptions = {
      from: "bruno.apos13.85wdftironhack_bruno.apos13@outlook.com", // nossa email
      to: email, //email do usuário que se cadastrou
      subject: "Account Activation", //assunto
      html: `<p>Click on the link to activate your account:<p> <a href=http://localhost:4000/users/activate-account/${user._id}>LINK</a>`,
    };

    //Dispara e=mail para o usuario
    await transporter.sendMail(mailOptions);

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Email not sent" });
  }
});

// Rota após clicar no Link de ativacao do email recebido
router.get("/activate-account/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;

    const user = await UserModel.findByIdAndUpdate(idUser, {
      ...req.body,
      emailConfirm: true,
    });

    if (!user) {
      return res.send({ mensage: "Account activation error" });
    }

    return res.status(200).json({ message: "User activated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error at activating user" });
  }
});

//Rota Login
router.post("/login", async (req, res) => {
  try {
    //capturar email e senha
    const { email, password } = req.body;

    //confirmar se foi enviado email e senha no body da requisição
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please inform your email and password." });
    }

    //achar o user que está tentando logar
    const user = await UserModel.findOne({ email: email });
    //checar se o usuário existe no banco de dados
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    //sabendo que o user existe, vamos comparar as senhas agora
    if (await bcrypt.compare(password, user.passwordHash)) {
      //deletando a senha
      delete user._doc.passwordHash;

      //criando token de acesso para esse usuário
      const token = generateToken(user);

      //retorna um objeto com o token e com as informações do usuário logado
      return res.status(200).json({
        token: token,
        user: user,
      });
    } else {
      return res.status(200).json({ message: "User logged" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Incorrect password or email" });
  }
});

//get one user, agora usando os middlewares
router.get("/profile", isAuth, attachCurrentUser, async (req, res) => {
  try {
    // console.log(req.currentUser); //criado no middle attachCurrentUser
    const loggedUser = req.currentUser;
    //busca o user que está logado

    if (!loggedUser) {
      return res.status(404).json({ message: " User not found" });
    }
    const user = await UserModel.findById(loggedUser._id).populate("wallets");
    //retorna erro quando o usario esta logado

    delete user._doc.passwordHash; //deletar o password e a versao
    delete user._doc._v;

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(404).json({ message: " User not found" });
  }
});

// Editar um usuario
router.put("/edit", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedInUser = req.currentUser;

    const editedUser = await UserModel.findByIdAndUpdate(
      loggedInUser._id,
      {
        ...req.body,
      },
      { new: true, runValidators: true }
    );

    delete editedUser._doc.passwordHash;
    delete editedUser._doc.__v;

    return res.status(200).json({ editedUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error at editing user." });
  }
});

// Desativar a conta de um usuario

router.get("/desactived-account/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await UserModel.findByIdAndUpdate(idUser, {
      ...req.body,
      emailConfirm: false,
    });

    return res.status(200).json({ message: " Desactived User" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error at changing status of user" });
  }
});
module.exports = router;
