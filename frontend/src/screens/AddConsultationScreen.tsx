import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddConsultationScreen = () => {
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [status, setStatus] = useState('');
  const navigation = useNavigation();

  const handleAddConsultation = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/consultations', {
        date,
        doctor,
        specialty,
        status,
        userId: 1, // Assumindo que o userId seja 1
      });
      if (response.status === 201) {
        alert('Consulta adicionada com sucesso!');
        navigation.goBack(); // Volta para a lista de consultas
      }
    } catch (error) {
      console.error('Erro ao adicionar consulta:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Data:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Digite a data da consulta"
      />
      <Text style={styles.label}>Médico:</Text>
      <TextInput
        style={styles.input}
        value={doctor}
        onChangeText={setDoctor}
        placeholder="Digite o nome do médico"
      />
      <Text style={styles.label}>Especialidade:</Text>
      <TextInput
        style={styles.input}
        value={specialty}
        onChangeText={setSpecialty}
        placeholder="Digite a especialidade"
      />
      <Text style={styles.label}>Status:</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Digite o status da consulta"
      />
      <Button title="Adicionar Consulta" onPress={handleAddConsultation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default AddConsultationScreen;
