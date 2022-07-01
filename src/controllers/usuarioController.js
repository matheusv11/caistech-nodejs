// const teste = () => {}
// exports.x = ''
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {

    async get(req, res) {
        const usuarios = await prisma.usuario.findMany()
        return res.send("oi")
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