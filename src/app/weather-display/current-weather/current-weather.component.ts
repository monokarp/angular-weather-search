import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrentWeather } from '../../data/weather.types';
import { DegreesPipe } from '../../common/degrees.pipe';
import { TitleCasePipe } from '@angular/common';
import { OpenWeatherService } from '../../data/integration/open-weather.service';

@Component({
  selector: 'app-current-weather',
  imports: [DegreesPipe, TitleCasePipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  @Input() public data!: CurrentWeather;

  constructor(public service: OpenWeatherService) {}
}
