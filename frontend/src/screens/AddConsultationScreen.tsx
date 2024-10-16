import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Novo import
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddConsultationScreen = () => {
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('1');  // ID de exemplo
  const [role, setRole] = useState('user');   // Novo campo para papel (user ou admin)
  const navigation = useNavigation();

  const handleAddConsultation = async () => {
    if (!date || !doctor || !specialty || !status || !userId || !role) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/consultations', {
        date,
        doctor,
        specialty,
        status,
        userId,
        role, // Enviando o papel junto com a requisição
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Consulta adicionada com sucesso');
        navigation.goBack(); // Volta para a tela anterior
      } else {
        Alert.alert('Erro', 'Erro ao tentar adicionar consulta');
      }
    } catch (error) {
      console.error('Erro ao adicionar consulta:', error);
      Alert.alert('Erro', 'Erro ao tentar adicionar consulta');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Data da Consulta"
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        placeholder="Médico"
        style={styles.input}
        value={doctor}
        onChangeText={setDoctor}
      />
      <TextInput
        placeholder="Especialidade"
        style={styles.input}
        value={specialty}
        onChangeText={setSpecialty}
      />
      <TextInput
        placeholder="Status"
        style={styles.input}
        value={status}
        onChangeText={setStatus}
      />
      {/* Picker para selecionar o papel */}
      <Picker
        selectedValue={role}
        style={styles.input}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Usuário" value="user" />
        <Picker.Item label="Administrador" value="admin" />
      </Picker>
      <Button title="Adicionar Consulta" onPress={handleAddConsultation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default AddConsultationScreen;
