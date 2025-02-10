import { Injectable } from '@angular/core';
import { NetworkTestStore } from '../network-test/network-test.store';
import { IWeatherService, WeatherService } from './weather.service';
import { Forecast, Location } from './weather.types';

@Injectable()
export class BadNetworkWeatherService implements IWeatherService {
  private readonly slowNetworkDelayMS = 750;
  private readonly forcedErrorMessage = 'Network errors enabled';

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
      setTimeout(
        () => (requestsThrow ? rej(new Error(this.forcedErrorMessage)) : value.then(res)),
        slowNetwork ? this.slowNetworkDelayMS : 0,
      );
    });
  }
}
