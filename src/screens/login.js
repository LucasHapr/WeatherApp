import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-blue-100 p-6">
      
      {/* Ícone e Nome do Projeto */}
      <Ionicons name="cloud-outline" size={80} color="#2563eb" />
      <Text className="text-3xl font-bold text-blue-700 mt-4 mb-8">WeatherApp</Text>

      {/* Formulário */}
      <TextInput
        className="w-full bg-white p-4 rounded-md mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full bg-white p-4 rounded-md mb-6"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-600 py-3 px-6 rounded-md mb-4"
      >
        <Text className="text-white font-semibold text-center">Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text className="text-blue-600 font-semibold">Criar uma Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
