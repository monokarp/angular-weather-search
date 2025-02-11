import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TestIdDirective } from '../common/test-id.directive';
import { DailyWeather, Forecast } from '../data/weather.types';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';
import { TestIds } from '../../test-ids';

@Component({
  selector: 'app-weather-display',
  imports: [CurrentWeatherComponent, DailyWeatherComponent, TestIdDirective],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDisplayComponent {
  @Input() public data: Forecast | null = null;

  public readonly TestIds = TestIds.ForecastPage.WeatherDisplay;

  public trackDailyForecast(item: DailyWeather): string {
    return item.date;
  }
}
