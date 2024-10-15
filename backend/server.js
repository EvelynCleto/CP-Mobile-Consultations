app.post('/api/consultations', (req, res) => {
  const { date, doctor, specialty, status, userId } = req.body;

  if (!date || !doctor || !specialty || !status || !userId) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const newConsultation = {
    id: Math.random().toString(36).substring(7),
    date,
    doctor,
    specialty,
    status,
    userId,
  };

  consultations.push(newConsultation);

  res.status(201).json({ message: 'Consulta criada com sucesso!', consultation: newConsultation });
});



// Excluir consulta
app.delete('/api/consultations/:id', (req, res) => {
  const consultationId = req.params.id;

  // Encontra o índice da consulta a ser excluída
  const index = consultations.findIndex(c => c.id === consultationId);
  if (index !== -1) {
    consultations.splice(index, 1); // Remove do array
    return res.status(200).json({ message: 'Consulta excluída com sucesso' });
  } else {
    return res.status(404).json({ error: 'Consulta não encontrada' });
  }
});

