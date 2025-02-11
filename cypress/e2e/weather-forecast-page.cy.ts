import { page as forecastPage } from '../page-objects/forecast.po';
import { component as loadingOverlay } from '../page-objects/loading-overlay.co';
import { component as errorNotification } from '../page-objects/error-notification.co';

describe('Weather forecast page', () => {
  beforeEach(() => {
    cy.visit('/');

    forecastPage.itself.should('be.visible');

    forecastPage.CitySearch.itself.should('be.visible');

    forecastPage.WeatherDisplay.itself.should('not.exist');
  });

  it('Displays weather forecast when a city is searched', () => {
    forecastPage.CitySearch.searchFor('london', 3);

    forecastPage.CitySearch.Locations.first().click();

    forecastPage.WeatherDisplay.Current.itself.should('be.visible');

    forecastPage.WeatherDisplay.Daily.itself.should('be.visible').should('have.lengthOf', 5);
  });

  it('Dismisses autocomplete on input clear and click outside', () => {
    forecastPage.CitySearch.searchFor('london', 3);

    forecastPage.CitySearch.Input.clear();

    forecastPage.CitySearch.locationsAreEmpty();

    forecastPage.CitySearch.searchFor('london', 3);

    forecastPage.CitySearch.Input.clickOutside();

    forecastPage.CitySearch.locationsAreEmpty();
  });

  it('Displays location bookmarks on top of the list and persists them through page reload', () => {
    forecastPage.CitySearch.searchFor('london', 3);

    forecastPage.CitySearch.Bookmark.first().click();

    forecastPage.CitySearch.itself.clickOutside();

    forecastPage.CitySearch.searchFor('london', 4);

    cy.reload();

    forecastPage.CitySearch.searchFor('london', 4);

    forecastPage.CitySearch.Bookmark.first().click();

    forecastPage.CitySearch.itself.clickOutside();

    forecastPage.CitySearch.searchFor('london', 3);
  });

  it('Overlays the widgets while data is loading', () => {
    cy.intercept('GET', '**/geo/**', (req) => {
      req.on('response', (res) => {
        res.setDelay(2000);
      });
    }).as('geocoding');

    loadingOverlay.itself.should('not.exist');

    forecastPage.CitySearch.Input.focus().type('rome');

    loadingOverlay.itself.should('be.visible').should('have.lengthOf', 1);

    cy.wait('@geocoding');

    loadingOverlay.itself.should('not.exist');
  });

  it('Displays error message when a request fails', () => {
    cy.intercept('GET', '**/geo/**', { statusCode: 500 }).as('geocoding');

    errorNotification.itself.should('not.exist');

    forecastPage.CitySearch.Input.focus().type('rome');

    cy.wait('@geocoding');

    errorNotification.itself.should('be.visible');

    errorNotification.Action.click();

    errorNotification.itself.should('not.exist');
  });
});
