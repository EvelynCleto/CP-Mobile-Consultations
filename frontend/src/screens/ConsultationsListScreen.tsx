import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Consultation {
  id: string; // Corrigido para string para coincidir com o ID gerado no backend
  date: string;
  doctor: string;
  specialty: string;
  status: string;
}

type ConsultationsListScreenNavigationProp = NavigationProp<RootStackParamList, 'Consultations'>;

const ConsultationsListScreen = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const route = useRoute();
  const navigation = useNavigation<ConsultationsListScreenNavigationProp>();
  const { role, userId } = route.params as { role: string; userId?: number };

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/consultations?role=${role}&userId=${userId}`);
        setConsultations(response.data.consultations);
      } catch (error) {
        console.error('Erro ao buscar consultas:', error);
      }
    };
    fetchConsultations();
  }, [role, userId]);

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta consulta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              const response = await axios.delete(`http://localhost:3000/api/consultations/${id}`);
              if (response.status === 200) {
                setConsultations(consultations.filter(c => c.id !== id));
                Alert.alert('Sucesso', 'Consulta excluída com sucesso');
              } else {
                Alert.alert('Erro', 'Erro ao tentar excluir a consulta');
              }
            } catch (error) {
              console.error('Erro ao excluir consulta:', error);
              Alert.alert('Erro', 'Erro ao tentar excluir a consulta');
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Consultation }) => (
    <View style={styles.consultationItem}>
      <View style={styles.consultationDetails}>
        <Text style={styles.consultationText}>Médico: {item.doctor}</Text>
        <Text style={styles.consultationText}>Especialidade: {item.specialty}</Text>
        <Text style={styles.consultationText}>Data: {item.date}</Text>
        <Text style={styles.consultationText}>Status: {item.status}</Text>
      </View>
      {role === 'admin' && (
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Consultas</Text>
      <FlatList
        data={consultations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhuma consulta encontrada.</Text>}
      />
      {role === 'admin' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddConsultation')}
        >
          <Text style={styles.addButtonText}>Adicionar Nova Consulta</Text>
        </TouchableOpacity>
      )}
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  consultationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  consultationDetails: {
    flex: 1,
  },
  consultationText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConsultationsListScreen;
