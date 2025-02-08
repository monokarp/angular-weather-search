import { Injectable } from '@angular/core';
import { ForecastPageStore } from './forecast-page.store';
import { WeatherService } from './data/weather.service';
import { Location } from './data/weather.types';

@Injectable()
export class ForecastPageService {
  constructor(
    private store: ForecastPageStore,
    private weather: WeatherService
  ) {}

  public async searchCity(name: string) {
    // @TODO push notification on error

    const locations = name ? await this.weather.suggestLocations(name) : [];

    this.store.locations$.next(locations);
  }

  public async selectLocation(location: Location) {
    const forecastData = await this.weather.currentWeatherAt(location);

    this.store.forecastData$.next(forecastData);
  }
}
