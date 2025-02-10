import { findPredominantCondition, mapDailyTemperature } from './forecast-adapter';
import { WeatherCondition } from './integration/openweather.types';
import { testForecast } from './forecast.fixture';

describe('forecast adapter', () => {
  describe('mapDailyTemperature', () => {
    it('groups timestamped data by date with aggregated min and max temperatures and predominant weather condition', () => {
      expect(mapDailyTemperature(testForecast)).toEqual([
        { date: '2025-02-10', min: -0.41, max: 0.06, weather: { description: 'clear sky', icon: '01d' } },
        { date: '2025-02-11', min: -2.57, max: 0.93, weather: { description: 'clear sky', icon: '01d' } },
        { date: '2025-02-12', min: -7, max: 3.05, weather: { description: 'clear sky', icon: '01d' } },
        { date: '2025-02-13', min: -1.15, max: 2.85, weather: { description: 'overcast clouds', icon: '04d' } },
        { date: '2025-02-14', min: -2.49, max: 0.82, weather: { description: 'overcast clouds', icon: '04d' } },
        { date: '2025-02-15', min: -4.11, max: -1.56, weather: { description: 'scattered clouds', icon: '03d' } },
      ]);
    });
  });

  describe('findPredominantCondition', () => {
    it('returns correct weather condition', () => {
      const mostlySunny: WeatherCondition[] = [
        {
          id: 1,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03d',
        },
        {
          id: 2,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
        {
          id: 3,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ];

      expect(findPredominantCondition(mostlySunny)).toEqual({
        description: 'clear sky',
        icon: '01d',
      });
    });

    it('swaps the icon', () => {
      const mostlyCloudyAtNight: WeatherCondition[] = [
        {
          id: 1,
          main: 'Clouds',
          description: 'scattered clouds',
          icon: '03n',
        },
        {
          id: 2,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
        {
          id: 3,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
        {
          id: 4,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ];

      expect(findPredominantCondition(mostlyCloudyAtNight)).toEqual({
        description: 'broken clouds',
        icon: '04d',
      });
    });
  });
});
