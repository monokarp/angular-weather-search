import { TestIds } from '../../src/test-ids';

class LoadingOverlayComponent {
  public get itself() {
    return cy.byTestId(TestIds.LoadingOverlay);
  }
}

export const component = new LoadingOverlayComponent();
