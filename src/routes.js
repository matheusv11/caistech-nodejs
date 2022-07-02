const express = require("express");
const router = express.Router();

// CONTROLLERS
const usuarioController = require('./controllers/usuarioController');
const autenticacaoController = require('./controllers/autenticacaoController');

// MIDDLEWARES
const tokenValidador = require('./middlewares/tokenValidador');

router.post('/autenticar', autenticacaoController.autenticar)

router.get('/usuario', usuarioController.get)
router.get('/usuario-unico/:usuarioId', usuarioController.getUsuarioUnico)
router.post('/criar-usuario', usuarioController.create)

router.patch('/atualizar-usuario', tokenValidador.validarToken, usuarioController.update)
router.delete('/deletar-usuario', tokenValidador.validarToken, usuarioController.delete)

module.exports = router;