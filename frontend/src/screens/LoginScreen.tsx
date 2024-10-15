import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [role, setRole] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = (selectedRole: string) => {
    setRole(selectedRole);
    console.log(`Papel selecionado: ${selectedRole}`);
    if (selectedRole === 'admin') {
      navigation.navigate('Consultations', { role: 'admin' });
    } else {
      const userId = 1;
      navigation.navigate('Consultations', { role: 'user', userId });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.buttonContainer}>
        <Button title="Entrar como Admin" onPress={() => handleLogin('admin')} />
        <Button title="Entrar como User" onPress={() => handleLogin('user')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default LoginScreen;
