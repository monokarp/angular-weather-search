import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DailyWeather } from '../../data/weather.types';
import { WeatherConditionsComponent } from '../weather-conditions/weather-conditions.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-weather',
  imports: [DatePipe, WeatherConditionsComponent],
  templateUrl: './daily-weather.component.html',
  styleUrl: './daily-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherComponent {
  @Input() public data!: DailyWeather;
}
