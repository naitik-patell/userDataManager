import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,private toastr:ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    console.log("Interceptor Called")
    return next.handle(req).pipe(
      
      catchError((error: HttpErrorResponse) => {
        console.log("Interceptor caleed");
        if (error.status === 400) {
          // this.message = error.error.message; // Get the message from the response body
          this.toastr.error("Some error occuredsfdsfdsfd try agin later", 'Unauthorized');

        }
        else if (error.status === 401) {
          // Redirect to the login page
          this.toastr.error(error.error.message, 'Error');
          this.router.navigate(['/user-data/login']);
        }
        else if (error.status == 409) {
          this.toastr.error(error.error.message, 'Error');
        }
        else {
          this.toastr.error("An unexpected error occured", 'Error');

        }
        return throwError(() => new Error(error.error));
      })
    );
  }
}

