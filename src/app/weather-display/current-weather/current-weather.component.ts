import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrentWeather } from '../../data/weather.types';
import { WeatherConditionsComponent } from '../weather-conditions/weather-conditions.component';

@Component({
  selector: 'app-current-weather',
  imports: [WeatherConditionsComponent],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  @Input() public data!: CurrentWeather;
}
