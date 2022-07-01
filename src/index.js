const express = require('express');
const app = express();
const cors = require('cors');
const porta = process.env.PORT || 3030;
const routes = require('./routes');

app.use(cors());
app.use(express.json())
app.use(routes);

app.listen(porta, ()=> console.log(`Backend rodando na porta ${porta}`));