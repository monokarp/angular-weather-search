import { Component } from '@angular/core';
import { OpenWeatherService } from './data/integration/open-weather.service';
import { WeatherService } from './data/weather.service';

@Component({
  selector: 'app-root',
  imports: [],
  providers: [OpenWeatherService, WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
