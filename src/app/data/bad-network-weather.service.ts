import { Injectable } from '@angular/core';
import { NetworkTestStore } from '../network-test/network-test.store';
import { IWeatherService, WeatherService } from './weather.service';
import { Forecast, Location } from './weather.types';

@Injectable()
export class BadNetworkWeatherService implements IWeatherService {
  constructor(
    private service: WeatherService,
    private store: NetworkTestStore,
  ) {}

  public async currentWeatherAt(location: Location): Promise<Forecast> {
    return this.proxy(this.service.currentWeatherAt(location));
  }

  public async suggestLocations(cityName: string): Promise<Location[]> {
    return this.proxy(this.service.suggestLocations(cityName));
  }

  private proxy<T>(value: Promise<T>): Promise<T> {
    const { slowNetwork, requestsThrow } = this.store.network$.getValue();

    return new Promise((res, rej) => {
      setTimeout(() => (requestsThrow ? rej('Network errors enabled') : value.then(res)), slowNetwork ? 500 : 0);
    });
  }
}
