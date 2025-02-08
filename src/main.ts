import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ForecastPageComponent } from './app/forecast-page.component';

bootstrapApplication(ForecastPageComponent, appConfig).catch((err) => console.error(err));
