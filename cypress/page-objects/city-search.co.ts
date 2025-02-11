import { TestIds } from '../../src/test-ids';

class CitySearchComponent {
  private readonly testIds = TestIds.ForecastPage.CitySearch;

  public get itself() {
    return cy.byTestId(this.testIds.Host);
  }

  public get Input() {
    return this.itself.byTestId(TestIds.ForecastPage.CitySearch.Input);
  }

  public get Locations() {
    return this.itself.byTestId(TestIds.ForecastPage.CitySearch.Location);
  }

  public get Bookmark() {
    return this.itself.byTestId(TestIds.ForecastPage.CitySearch.Bookmark);
  }

  public locationsAreEmpty() {
    this.Input.focus();

    this.Locations.should('not.exist');
  }

  public searchFor(cityName: string, expectedSuggestedLocationCount: number) {
    this.Input.focus().type(cityName);

    this.Locations.should('be.visible').should('have.lengthOf', expectedSuggestedLocationCount);
  }
}

export const component = new CitySearchComponent();
