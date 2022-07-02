const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { compareSync: validarSenha } = require('bcrypt')
const { sign: gerarToken } = require('jsonwebtoken')

module.exports = {
    async autenticar(req, res) {
        const { email, senha } = req.body
        
        const usuario = await prisma.usuario.findFirst({
            where: {
                email
            }
        });

        if(!usuario || !validarSenha(senha, usuario.senha)) {
            return res.status(401).send({ erro: "Email ou senha incorretos"});
        }

        const token = gerarToken({ usuarioId: usuario.id }, process.env.JWT_SECRET || 'secret123', {
            expiresIn: "2h"
        })

        return res.status(200).send({ token })
    }
}