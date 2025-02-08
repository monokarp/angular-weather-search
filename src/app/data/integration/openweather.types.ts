// Generated these based on current docs:
// https://openweathermap.org/api/one-call-3#current

export type MeasuringUnitType = 'standard' | 'metric' | 'imperial';

export interface CurrentWeatherResponse {
  coord: {
    lon: number; // City geo location, longitude
    lat: number; // City geo location, latitude
  };
  weather: WeatherCondition[];
  base: string; // Internal parameter
  main: {
    temp: number; // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    feels_like: number; // Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    temp_min: number; // Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    temp_max: number; // Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    pressure: number; // Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    sea_level: number;
    grnd_level: number;
    humidity: number; // Humidity, %
  };
  visibility: number; // Visibility, meter. The maximum value of the visibility is 10km
  wind: {
    speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
    deg: number; // Wind direction, degrees (meteorological)
    gust?: number; // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
  };
  clouds: {
    all: number; // Cloudiness, %
  };
  dt: number; // Time of data calculation, unix, UTC
  sys: {
    type: number; // Internal parameter
    id: number; // Internal parameter
    country: string; // Country code (GB, JP etc.)
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
  };
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // Internal parameter
}

export interface ForecastResponse {
  cod: string; // Internal parameter
  message: number; // Internal parameter
  cnt: number; // Number of lines returned by this API call
  list: ForecastItem[];
  city: {
    id: number; // City ID
    name: string; // City name
    coord: {
      lat: number; // City geo location, latitude
      lon: number; // City geo location, longitude
    };
    country: string; // Country code (GB, JP etc.)
    population: number; // City population
    timezone: number; // Shift in seconds from UTC
    sunrise: number; // Sunrise time, unix, UTC
    sunset: number; // Sunset time, unix, UTC
  };
}

export interface ForecastItem {
  dt: number; // Time of data forecasted, unix, UTC
  main: {
    temp: number; // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    feels_like: number; // This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    temp_min: number; // Minimum temperature at the moment. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    temp_max: number; // Maximum temperature at the moment. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
    pressure: number; // Atmospheric pressure on the sea level, hPa
    sea_level?: number; // Atmospheric pressure on the sea level, hPa (optional)
    grnd_level?: number; // Atmospheric pressure on the ground level, hPa (optional)
    humidity: number; // Humidity, %
    temp_kf: number; // Internal parameter
  };
  weather: WeatherCondition[];
  clouds: {
    all: number; // Cloudiness, %
  };
  wind: {
    speed: number; // Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
    deg: number; // Wind direction, degrees (meteorological)
    gust?: number; // Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour (optional)
  };
  visibility: number; // Visibility, meter. The maximum value of the visibility is 10km
  pop: number; // Probability of precipitation
  rain?: {
    '3h'?: number; // Rain volume for last 3 hours, mm (optional)
  };
  snow?: {
    '3h'?: number; // Snow volume for last 3 hours, mm (optional)
  };
  sys: {
    pod: 'd' | 'n'; // Part of the day (d -> day, n -> night)
  };
  dt_txt: string; // Date and time in textual format (YYYY-MM-DD HH:MM:SS)
}

export interface WeatherCondition {
  id: number; // Weather condition id
  main: string; // Group of weather parameters (Rain, Snow, Extreme etc.)
  description: string; // Weather condition within the group
  icon: string; // Weather icon id
}

export interface DirectGeocodingResponse {
  name: string; // Name of the location
  local_names?: Record<string, string>; // Localized names of the location
  lat: number; // Latitude
  lon: number; // Longitude
  country: string; // Country code (ISO 3166)
  state?: string; // State, if applicable (only for US locations)
}
