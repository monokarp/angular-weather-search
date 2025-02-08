import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Forecast } from '../data/weather.types';

@Component({
  selector: 'app-weather-display',
  imports: [],
  templateUrl: './weather-display.component.html',
  styleUrl: './weather-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDisplayComponent {
  @Input() public data: Forecast | null = null;
}
