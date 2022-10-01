//importar o express
const express = require("express");
// instanciar as rotas pegando do express
const router = express.Router();

//importar os models
const UserModel = require("../models/User.model");

const bcrypt = require("bcrypt");
const saltRounds = 10; // Define a quantidade de "saltos que serão adicionados a criptografia da senha"

const generateToken = require("../config/jwt.config");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isAdmin = require("../middlewares/isAdmin");

//configurando o Transporter
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "ironhackFG@outlook.com",
    pass: "SenhaSegura@123",
  },
});
// const logRequests = require("../middlewares/requests");
// Sign up -  1º rota: Criar um user (Login com senha)
router.post("/sign-up", async (req, res) => {
  try {
    //capturando o password enviado no corpo da requisicao
    const { password, email } = req.body;

    //checando se a senha existe e se ela passou na RegEx
    if (
      //checando se existe esse campo o req.body
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

    //gerar o salt com a quantidade de saltos definida(10)
    const salt = await bcrypt.genSalt(saltRounds); //chamar a funcao hash da biblioteca e passar a senha juntamente com o salt criado
    console.log(salt);

    //chamar a função hash da biblioteca e passar a senha juntamente com o salt criado
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    //criar a entrada no banco e dados adicionando a senha hasheada no campo: passwordHash
    const user = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    //deletar o campo da senha antes de devolver o usuario para a response
    delete user._doc.passwordHash;

    //return res.status(201).json(user);

    //envio de email   <<<===== ADD
    //configurando o email que será enviado!

    const mailOptions = {
      from: "turma85wdft@hotmail.com", // nossa email
      to: email, //email do usuário que se cadastrou
      subject: "Account Activation", //assunto
      html: `<p>Click on the link to activate your account:<p> <a href=http://localhost:4000/users/activate-account/${user._id}>LINK</a>`,
    };

    //Dispara e=mail para o usuario
    await transporter.sendMail(mailOptions);

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// Rota após clicar no Link de ativacao do email recebido
router.get("/activate-account/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;

    const user = await UserModel.findOne({ _id: idUser });

    if (!user) {
      return res.send("Erro na ativação da conta");
    }

    await UserModel.findByIdAndUpdate(idUser, {
      emailConfirm: true,
    });

    res.send(`<h1>Usuário ativado</h1>`);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    //capturar as chaves de email e password enviadas no corpo da requisicao
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please, inform email and password! " });
    }
    // achar o user que esta tentando logar
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found it on the system" });
    }

    //checar se o usuario existe
    if (await bcrypt.compare(password, user.passwordHash)) {
      //caso positivo, apagar o passwordHash do user para nao devolver essa informacao
      delete user._doc.passwordHash;

      // gerar o token com as informacoes do usuario
      const token = generateToken(user);

      // retornar um objeto com as informacoes do user e o token
      return res.status(200).json({
        user: user,
        token: token,
      });
    } else {
      //se a comparacao da password e do passwordHash nao forem compativeis, retornar o erro com a mensagem
      return res
        .status(400)
        .json({ message: "Email and/or password not correct" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/profile", isAuth, attachCurrentUser, async (req, res) => {
  try {
    // console.log(req.currentUser); //criado no middle attachCurrentUser
    const loggedUser = req.currentUser;
    //busca o user que está logado

    if (!loggedUser) {
      return res.status(404).json({ message: " User not found" });
    }
    const user = await UserModel.findById(loggedUser._id);
    //retorna erro quando o usario esta logado

    delete user._doc.passwordHash; //deletar o password e a versao
    delete user._doc._v;

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: " User not found" });
  }
});

// Editar um usuario
router.put("/edit", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const idUser = req.currentUser._id;
    const newName = req.body.name;
    const editedUser = await UserModel.findIdAndUpdate(
      idUser,
      { name: newname },
      { new: true, runValidators: true }
    );

    delete editedUser._doc.passwordHash;
    delete editedUser._doc.__v;

    return res.status(200).json(editedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
