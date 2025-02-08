import { CurrentWeatherResponse, ForecastItem } from './integration/openweather.types';

export type CurrentWeather = CurrentWeatherResponse;
export type DailyWeather = ForecastItem;

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
