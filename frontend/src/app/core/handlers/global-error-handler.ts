import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private notificationService = inject(NotificationService);
  private zone = inject(NgZone);

  handleError(error: any): void {
    console.error('An unexpected error occurred:', error);
  }
}