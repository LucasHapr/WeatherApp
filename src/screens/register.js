import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso!', 'Conta criada com sucesso!');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Erro ao criar conta', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-blue-100 p-6">

      {/* Ícone e Nome do Projeto */}
      <Ionicons name="cloud-outline" size={80} color="#2563eb" />
      <Text className="text-3xl font-bold text-blue-700 mt-4 mb-8">WeatherApp</Text>

      {/* Formulário */}
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        className="w-full bg-white p-4 rounded-md mb-4 border border-gray-300"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        className="w-full bg-white p-4 rounded-md mb-6 border border-gray-300"
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-green-600 py-3 px-6 rounded-md mb-4"
      >
        <Text className="text-white font-semibold text-center">Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-blue-600 font-semibold">Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
