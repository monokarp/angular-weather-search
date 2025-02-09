import { NgModule } from '@angular/core';
import { WeatherService } from './weather.service';
import { BadNetworkWeatherService } from './bad-network-weather.service';
import { OpenWeatherService } from './integration/open-weather.service';

@NgModule({
  providers: [WeatherService, OpenWeatherService, BadNetworkWeatherService],
})
export class DataModule {}
