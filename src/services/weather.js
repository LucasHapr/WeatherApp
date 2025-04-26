import { WEATHER_API_KEY } from '@env';

export const fetchWeather = async (city) => {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&lang=pt`);
  if (!response.ok) {
    throw new Error('Erro ao buscar dados de clima');
  }
  return response.json();
};
