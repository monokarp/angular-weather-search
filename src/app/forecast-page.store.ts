import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Forecast, LocationSelectOption } from './data/weather.types';

@Injectable()
export class ForecastPageStore {
  public readonly locations$ = new BehaviorSubject<LocationSelectOption[]>([]);

  public readonly selectedLocation$ = new BehaviorSubject<LocationSelectOption | null>(null);

  public readonly forecastData$ = new BehaviorSubject<Forecast | null>(null);

  public readonly loadingLocations$ = new BehaviorSubject<boolean>(false);
  public readonly loadingForecast$ = new BehaviorSubject<boolean>(false);
}
