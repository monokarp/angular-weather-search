import { Injectable } from '@angular/core';
import { mapDailyTemperature } from './forecast-adapter';
import { OpenWeatherService } from './integration/open-weather.service';
import { Forecast, Location } from './weather.types';

export interface IWeatherService {
  currentWeatherAt(location: Location): Promise<Forecast>;
  suggestLocations(cityName: string): Promise<Location[]>;
}

@Injectable()
export class WeatherService implements IWeatherService {
  private readonly forecastDaysCount = 5;

  constructor(private openWeatherService: OpenWeatherService) {}

  public async currentWeatherAt(location: Location): Promise<Forecast> {
    const [current, forecast] = await Promise.all([
      this.openWeatherService.currentWeatherAt(location),
      this.openWeatherService.fiveDayForecastAt(location),
    ]);

    const daily = mapDailyTemperature(forecast);
    const specifiedDayCount = daily.length <= this.forecastDaysCount ? daily : daily.slice(0, this.forecastDaysCount);

    return {
      current,
      daily: specifiedDayCount,
    };
  }

  public async suggestLocations(cityName: string): Promise<Location[]> {
    const geocodeLocations = await this.openWeatherService.possibleLocationsOf(cityName);

    return geocodeLocations.map((one) => ({
      name: one.name,
      lat: one.lat,
      lon: one.lon,
      country: one.country,
    }));
  }
}
