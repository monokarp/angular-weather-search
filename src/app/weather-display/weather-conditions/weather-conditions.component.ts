import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WeatherCondition } from '../../data/integration/openweather.types';

@Component({
  selector: 'app-weather-conditions',
  imports: [],
  templateUrl: './weather-conditions.component.html',
  styleUrl: './weather-conditions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherConditionsComponent {
  @Input() public data!: WeatherCondition;

  public iconSource(iconId: string) {
    return `https://openweathermap.org/img/wn/${iconId}.png`;
  }
}
