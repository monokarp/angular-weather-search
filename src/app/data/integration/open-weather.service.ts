import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Coordinates } from '../weather.types';
import {
  CurrentWeatherResponse,
  DirectGeocodingResponse,
  ForecastResponse,
  MeasuringUnitType,
} from './openweather.types';

@Injectable()
export class OpenWeatherService {
  private readonly locationsLimit = 3;
  private readonly forecastTimestampsCount = 8 * 5; // one timestamp covers 3h

  private readonly measuringSystem: MeasuringUnitType = 'metric';

  constructor(private http: HttpClient) {}

  public currentWeatherAt(coords: Coordinates): Promise<CurrentWeatherResponse> {
    const { lat, lon } = coords;

    return firstValueFrom(
      this.http.get<CurrentWeatherResponse>('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon,
          units: this.measuringSystem,
          appid: environment.ApiKey,
        },
      }),
    );
  }

  public fiveDayForecastAt(coords: Coordinates): Promise<ForecastResponse> {
    const { lat, lon } = coords;

    return firstValueFrom(
      this.http.get<ForecastResponse>('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          lat,
          lon,
          cnt: this.forecastTimestampsCount,
          units: this.measuringSystem,
          appid: environment.ApiKey,
        },
      }),
    );
  }

  public async possibleLocationsOf(cityName: string): Promise<DirectGeocodingResponse[]> {
    const possibleLocations = await firstValueFrom(
      this.http.get<DirectGeocodingResponse[]>('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
          q: cityName,
          limit: this.locationsLimit,
          appid: environment.ApiKey,
        },
      }),
    );

    return possibleLocations;
  }
}
