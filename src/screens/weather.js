import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { fetchWeather } from "../services/weather";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { Ionicons } from "@expo/vector-icons";

export default function Weather({ navigation }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o clima.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deslogar.");
    }
  };

  return (
    <View className="flex-1 bg-blue-100 p-6 justify-center items-center">
      <Ionicons name="cloud-outline" size={80} color="#2563eb" />
      <Text className="text-3xl font-bold text-blue-700 mb-6 text-center">WeatherApp</Text>
      <View className="absolute top-10 right-6">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 p-3 rounded-full"
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-bold mb-6 text-center">
        Consulta Clima
      </Text>
      <TextInput
        placeholder="Digite a cidade"
        value={city}
        onChangeText={setCity}
        className="w-full bg-white p-4 rounded-md mb-4 border border-gray-300 text-center"
      />
      <TouchableOpacity
        onPress={handleSearch}
        className="bg-blue-600 py-3 px-6 rounded-md mb-6"
      >
        <Text className="text-white font-semibold">Buscar Clima</Text>
      </TouchableOpacity>
      {weather && (
        <View className="bg-white rounded-2xl shadow-lg p-6 items-center w-full max-w-sm space-y-4">
          <Text className="text-2xl font-bold text-blue-800">
            {weather.location.name}
          </Text>
          <Text className="text-5xl font-extrabold text-blue-600">
            {weather.current.temp_c}°C
          </Text>
          <Text className="text-lg text-gray-500 capitalize">
            {weather.current.condition.text}
          </Text>
          <Image
            source={{ uri: `https:${weather.current.condition.icon}` }}
            className="w-24 h-24"
          />
          <View className="w-full mt-4 space-y-2">
            <Text className="text-center text-gray-700">
              Sensação térmica: {weather.current.feelslike_c}°C
            </Text>
            <Text className="text-center text-gray-700">
              Vento: {weather.current.wind_kph} km/h
            </Text>
            <Text className="text-center text-gray-700">
              Umidade: {weather.current.humidity}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
