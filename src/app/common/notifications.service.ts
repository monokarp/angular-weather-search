import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  public error(message: string) {
    this.snackbar.openFromComponent(ErrorNotificationComponent, {
      panelClass: 'notification-snackbar',
      data: { message, actionText: 'OK', duration: 3000 },
    });
  }
}
