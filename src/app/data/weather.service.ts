import { Injectable } from '@angular/core';
import { OpenWeatherService } from './integration/open-weather.service';
import { Forecast, Location } from './weather.types';

@Injectable()
export class WeatherService {
  constructor(private openWeatherService: OpenWeatherService) {}

  public async currentWeatherAt(location: Location): Promise<Forecast> {
    const [current, forecast] = await Promise.all([
      this.openWeatherService.currentWeatherAt(location),
      this.openWeatherService.fiveDayForecastAt(location),
    ]);

    return { current, daily: forecast.list };
  }

  public async suggestLocations(cityName: string): Promise<Location[]> {
    const geocodeLocations = await this.openWeatherService.possibleLocationsOf(
      cityName
    );

    return geocodeLocations.map((one) => ({
      name: one.name,
      lat: one.lat,
      lon: one.lon,
      country: one.country,
    }));
  }
}
