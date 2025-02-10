import { ForecastResponse, WeatherCondition } from './integration/openweather.types';
import { DailyWeather, WeatherConditionData } from './weather.types';

export function mapDailyTemperature(data: ForecastResponse): DailyWeather[] {
  const map = new Map<string, Omit<DailyWeather, 'date' | 'weather'> & { weather: WeatherCondition[] }>();

  for (const one of data.list) {
    const [date] = one.dt_txt.split(' ');

    if (!map.has(date)) {
      map.set(date, {
        min: one.main.temp,
        max: one.main.temp,
        weather: [...one.weather],
      });
    } else {
      const entry = map.get(date)!;

      if (one.main.temp < entry.min) {
        entry.min = one.main.temp;
      }

      if (one.main.temp > entry.max) {
        entry.max = one.main.temp;
      }

      entry.weather.push(...one.weather);
    }
  }

  return Array.from(map).map(([date, values]) => ({
    date,
    ...values,
    weather: findPredominantCondition(values.weather),
  }));
}

export function findPredominantCondition(collection: WeatherCondition[]): WeatherConditionData {
  const count = new Map<string, number>();

  for (const one of collection) {
    if (!count.has(one.description)) {
      count.set(one.description, 1);
    } else {
      count.set(one.description, count.get(one.description)! + 1);
    }
  }

  const [[predominantDescription]] = Array.from(count).sort((a, b) => b[1] - a[1]);

  const { icon } = collection.find((one) => one.description == predominantDescription)!;

  return {
    description: predominantDescription,
    icon: icon.replace('n', 'd'),
  };
}
