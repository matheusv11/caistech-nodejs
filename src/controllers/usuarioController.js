// const teste = () => {}
// exports.x = ''
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { hashSync: hash } = require('bcrypt')

module.exports = {
    // BUSCAR POR QUERY E POR PARAMS
    async get(req, res) {
        const { nome, email } = req.query;

        const usuarios = await prisma.usuario.findMany({
            where: {
                nome: {
                    contains: nome 
                },
                email: {
                    contains: email
                }
            }
        })

        return res.status(200).send(usuarios)
    },

    async getUsuarioUnico(req, res) {
        const usuarioId = req.params.usuarioId;

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: parseInt(usuarioId)
            }
        })

        if(!usuario) {
            return res.status(404).send({ erro: "Usuário não encontrado"})
        }

        return res.status(200).send(usuario)
    },

    async create(req, res) {
        const { nome, email, senha } = req.body
        
        const usuario = await prisma.usuario.findFirst({
            where: {
                email
            }
        });

        if(usuario) {
            return res.status(401).send({ erro: "Usuário já cadastrado"});
        }

        const senhaCriptografada = hash(senha, 10);

        await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCriptografada
            }
        })

        return res.status(201).send({ mensagem: "Usuário cadastro com sucesso" })
    },

    async update(req, res) {
        const { nome, senha } = req.body
        const usuarioId = res.locals.usuarioId

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: usuarioId
            }
        })

        if(!usuario) {
            return res.status(401).send({ erro: "Usuário não encontrado"})
        }

        await prisma.usuario.update({
            data: {
                nome,
                senha: senha ? hash(senha, 10) : undefined
            },
            where: {
                id: usuarioId
            }
        })

        return res.status(200).send({ mensagem: "Dados atualizados com sucesso" })
        // const usuarioId = res.locals.usuarioId

    },

    async delete(req, res) {
        const usuarioId = res.locals.usuarioId

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: usuarioId
            }
        })

        if(!usuario) {
            return res.status(401).send({ erro: "Usuário não encontrado"})
        }

        await prisma.usuario.delete({
            where: {
                id: usuarioId
            }
        })

        return res.status(200).send({ mensagem: "Usuário deletado com sucesso"});

    }

}

// function teste() {
//     return "oiii"
// }

// async function get(req, res) {
//     console.log(teste())
//     return res.send(teste())
// }

// module.exports = {
//     fucker,
//     get
// }