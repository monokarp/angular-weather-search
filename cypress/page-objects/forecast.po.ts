import { TestIds } from '../../src/test-ids';
import { component as citySearch } from './city-search.co';
import { component as weatherDisplay } from './weather-display.co';

class ForecastPage {
  private readonly testIds = TestIds.ForecastPage;

  public readonly CitySearch = citySearch;
  public readonly WeatherDisplay = weatherDisplay;

  public get itself() {
    return cy.byTestId(this.testIds.Host);
  }
}

export const page = new ForecastPage();
