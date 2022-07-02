const express = require("express");
const router = express.Router();

// CONTROLLERS
const usuarioController = require('./controllers/usuarioController');
const autenticacaoController = require('./controllers/autenticacaoController');

// MIDDLEWARES
const tokenValidador = require('./middlewares/tokenValidador');
const joi = require("./middlewares/joi");

router.post('/autenticar', autenticacaoController.autenticar)

router.get('/usuario', usuarioController.get)
router.get('/usuario-unico/:usuarioId', usuarioController.getUsuarioUnico)
router.post('/criar-usuario', joi.camposUsuario, usuarioController.create)

router.post('/solicitar-senha', usuarioController.solicitarSenha)
router.post('/recuperar-senha', tokenValidador.validarToken, usuarioController.recuperarSenha)

router.patch('/atualizar-usuario', tokenValidador.validarToken, usuarioController.update)
router.delete('/deletar-usuario', tokenValidador.validarToken, usuarioController.delete)

module.exports = router;