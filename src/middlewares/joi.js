const Joi = require('joi')

module.exports = {
    camposUsuario(req, res, next) {
        const schema = Joi.object({
            nome: Joi.string().required(),
            email: Joi.string().email().required(),
            senha: Joi.string().required()  
        })

        const validate = schema.validate(req.body)

        if(validate.error) return res.status(401).send({ erro: validate.error.message })

        next()
    }

}