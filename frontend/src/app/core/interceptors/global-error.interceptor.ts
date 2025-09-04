import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const serverMessage = error.error?.message;
        const errorMessage = serverMessage || getGenericErrorMessage(error.status);
        notificationService.showError(errorMessage);
      }
      
      return throwError(() => error);
    })
  );
};

function getGenericErrorMessage(status: number): string {
  switch (status) {
    case 400: return 'Bad Request: Please check the data you sent.';
    case 401: return 'Unauthorized: You need to be logged in to do that.';
    case 403: return 'Forbidden: You do not have permission to access this resource.';
    case 404: return 'Not Found: The requested resource could not be found.';
    case 500: return 'Internal Server Error: Something went wrong on our end. Please try again later.';
    default: return `An unexpected HTTP error occurred. Status: ${status}`;
  }
}