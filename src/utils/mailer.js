const nodemailer = require("nodemailer");
const { sign: gerarToken } = require('jsonwebtoken')

module.exports = async function enviarEmail(usuarioId) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const token = gerarToken({ usuarioId: usuarioId }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: "10m"
  })

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: "bar@example.com, baz@example.com",
    subject: "Recuperação de Senha",
    text: "Recupere sua senha",
    html: `<b>Seu token de recuperação é: ${token} </b>`, 
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}