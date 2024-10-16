const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Certifique-se de que o corpo da requisição seja lido como JSON

// Array para armazenar consultas
let consultations = [];

// Rota para adicionar consulta
app.post('/api/consultations', (req, res) => {
  const { date, doctor, specialty, status, userId, role } = req.body;

  // Verificação de campos obrigatórios
  if (!date || !doctor || !specialty || !status || !userId || !role) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Certificando-se de que userId é string
  const newConsultation = {
    id: Math.random().toString(36).substring(7),
    date,
    doctor,
    specialty,
    status,
    userId: userId.toString(),  // Converte o userId para string
    role,  // user ou admin
  };

  // Armazenando a nova consulta
  consultations.push(newConsultation);

  console.log('Consulta adicionada:', newConsultation);

  // Retornando a consulta criada
  res.status(201).json({ message: 'Consulta criada com sucesso!', consultation: newConsultation });
});

// Rota para obter consultas filtradas pelo papel (user ou admin)
app.get('/api/consultations', (req, res) => {
  const { role, userId } = req.query;

  // Verificação se os parâmetros estão presentes
  if (!role) {
    console.log('Erro: Parâmetro role não fornecido');
    return res.status(400).json({ error: 'Parâmetro role é obrigatório. Acesso não autorizado.' });
  }

  console.log(`Recebido role: ${role}, userId: ${userId || 'não fornecido'}`);

  let filteredConsultations = consultations;

  // Se o papel for 'user', filtra consultas do usuário
  if (role === 'user') {
    if (!userId) {
      console.log('Erro: Parâmetro userId não fornecido para role user');
      return res.status(400).json({ error: 'Parâmetro userId é obrigatório para role user' });
    }
    filteredConsultations = consultations.filter(c => c.userId === userId.toString() && c.role === 'user');
    console.log(`Consultas filtradas para user ${userId}:`, filteredConsultations);
  } 
  // Se o papel for 'admin', ele pode ver todas as consultas
  else if (role === 'admin') {
    console.log('Consultas para admin:', filteredConsultations);
  }

  // Verificação final do filtro
  if (filteredConsultations.length === 0) {
    console.log('Nenhuma consulta encontrada após o filtro.');
  }

  // Retornando as consultas filtradas
  res.status(200).json({ consultations: filteredConsultations });
});

// Inicia o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
