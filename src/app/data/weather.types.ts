import { CurrentWeatherResponse, WeatherCondition } from './integration/openweather.types';

export type CurrentWeather = CurrentWeatherResponse;

export type WeatherConditionData = Omit<WeatherCondition, 'id' | 'main'>;

export interface DailyWeather {
  date: string;
  min: number;
  max: number;
  weather: WeatherConditionData;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Forecast {
  current: CurrentWeather;
  daily: DailyWeather[];
}

export interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
}
