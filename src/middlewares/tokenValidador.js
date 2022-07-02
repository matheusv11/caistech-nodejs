const { verify: verificarToken } = require('jsonwebtoken');

module.exports = {
    validarToken(req, res, next) {
        const token = req.headers.authorization?.split(" ")[1]

        verificarToken(token, process.env.JWT_SECRET || 'secret123', (err, data) => {
            if(err) return res.status(401).send({ erro: "Token inválido"})

            res.locals.usuarioId = data.usuarioId
            next()
        })

    }

}