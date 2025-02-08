import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Forecast, Location } from './data/weather.types';

@Injectable()
export class ForecastPageStore {
  public readonly locations$ = new BehaviorSubject<Location[]>([]);

  public readonly selectedLocation$ = new BehaviorSubject<Location | null>(null);

  public readonly forecastData$ = new BehaviorSubject<Forecast | null>(null);
}
