import {
  CurrentWeatherResponse,
  ForecastItem,
} from './integration/openweather.types';

type CurrentWeather = CurrentWeatherResponse;
type DailyWeather = ForecastItem;

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
