 import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
 import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong. Please try again later';

      if (error.status === 0) {
        message = 'Cannot connect to the server. Please check your internet connection.';
      } else {
        switch (error.status) {
          case 400:
            message = error.error.message || 'Invalid request. Please check your data.';
            break;
          case 401:
            message = error.error.message || 'Unauthorized access. Please log in. 🔐';
            break;
          case 403:
            message = 'You don’t have permission to perform this action. 🚫';
            break;
          case 404:
            message = error.error.message ||'The requested resource could not be found. 🔍';
            break;
          case 408:
            message = 'The request timed out. Please try again later. ⏳';
            break;
          case 409:
            message = error.error.message ||'Conflict detected. Please refresh and try again. ⚠️';
            break;
          case 415:
            message = 'Unsupported file type or content format.';
            break;
          case 422:
            message = 'Validation error. Please check your inputs.';
            break;
          case 429:
            message = 'Too many requests. Please wait a moment. 🚦';
            break;
          case 500:
            message = 'Internal Server Error. Please try again later. 💥';
            break;
          case 502:
            message = 'Bad Gateway. Please try again in a few moments. 🛠️';
            break;
          case 503:
            message = 'Server temporarily unavailable. Please try again later. 💤';
            break;
          case 504:
            message = 'Gateway Timeout. Server took too long to respond. ⏰';
            break;
          default:
            message = error.error.message || `Unexpected error (${error.status}).`;
        }
      }

      toast.error(message);
      return throwError(() => error);
    })
  );
};
