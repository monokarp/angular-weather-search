import { TestIds } from '../../src/test-ids';

class CitySearchComponent {
  private readonly testIds = TestIds.ForecastPage.CitySearch;

  public itself() {
    return cy.byTestId(this.testIds.Host);
  }

  public Input() {
    return cy.byTestId(TestIds.ForecastPage.CitySearch.Input);
  }

  public Option() {
    return cy.byTestId(TestIds.ForecastPage.CitySearch.Option);
  }

  public Bookmark() {
    return cy.byTestId(TestIds.ForecastPage.CitySearch.Bookmark);
  }
}

export const component = new CitySearchComponent();
