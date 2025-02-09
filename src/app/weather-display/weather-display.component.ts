import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DailyWeather, Forecast } from '../data/weather.types';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';

@Component({
  selector: 'app-weather-display',
  imports: [CurrentWeatherComponent, DailyWeatherComponent],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDisplayComponent {
  @Input() public data: Forecast | null = null;

  public trackDailyForecast(item: DailyWeather): string {
    return item.date;
  }
}
