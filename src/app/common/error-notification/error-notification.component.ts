import { Component, HostBinding, Inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { testIdAttrName, TestIds } from '../../../test-ids';
import { TestIdDirective } from '../test-id.directive';

interface SnackbarConfig {
  message: string;
  actionText: string;
  duration: number;
}

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrl: './error-notification.component.scss',
  host: { class: 'notification-snackbar' },
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, TestIdDirective],
})
export class ErrorNotificationComponent implements OnDestroy {
  public readonly TestIds = TestIds.ErrorNotification;

  private timeoutId: number | undefined;

  @HostBinding(`attr.${testIdAttrName}`) testId = this.TestIds.Host;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarConfig,
    public snackBarRef: MatSnackBarRef<SnackbarConfig>,
  ) {
    this.timeoutId = window.setTimeout(() => this.snackBarRef.dismissWithAction(), data.duration);
  }

  public ngOnDestroy(): void {
    this.dismiss();
  }

  public dismiss() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }

    this.snackBarRef.dismissWithAction();
  }
}
