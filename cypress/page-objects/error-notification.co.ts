import { TestIds } from '../../src/test-ids';

class ErrorNotificationComponent {
  public get itself() {
    return cy.byTestId(TestIds.ErrorNotification.Host);
  }

  public get Action() {
    return cy.byTestId(TestIds.ErrorNotification.Action);
  }
}

export const component = new ErrorNotificationComponent();
