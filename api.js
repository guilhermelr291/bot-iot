const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

function gerarToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
}

function autenticarToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ erro: 'Token ausente ou inválido' });
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ erro: 'Token inválido' });
  }
}

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida)
      return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = gerarToken(user);
    res.json({ token });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

app.get('/commands', autenticarToken, async (req, res) => {
  try {
    const comandos = await prisma.command.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(comandos);
  } catch (err) {
    console.error('Erro ao buscar comandos:', err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

const PORT = process.env.API_PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
