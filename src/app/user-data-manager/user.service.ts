import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { LoginFormModel } from '../models/request/login-form.model';
import { ResponseModel } from '../models/response/reponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private router:Router) { }
  baseUrl = 'https://localhost:7200/';
  // ---------------------Get Method--------------------------

  get<T>(path: string, headers: HttpHeaders = new HttpHeaders()): Observable<ResponseModel | null> {
    return this.http.get<ResponseModel>(this.baseUrl  + path, { headers }).pipe(
      catchError(error => {
        console.error('Error occurred:', error); // Log the error
        return of(null); // Return a default value or handle the error as needed
      })

    );
  }


 // ------------------Login Post Method----------------------
 login(path: string="user/login", body: LoginFormModel, headers: HttpHeaders = new HttpHeaders({ 'accept': 'text/plain' })): Observable<any> {
  return this.http.post(this.baseUrl  + path, body, { headers }).pipe(
    // tap((Response: any) => console.log('Login Status :', Response)),
    catchError(error => {
      return throwError(error);
    })

  );
}

  // ------------------Post Method----------------------
  post(path: string, body: any, headers: HttpHeaders = new HttpHeaders({ 'accept': 'text/plain' })): Observable<any> {
    return this.http.post(this.baseUrl  + path, body, { headers }).pipe(
      // tap((Response: any) => console.log('Login Status :', Response)),
      catchError(error => {
        return throwError(error);
      })

    );
  }

  // ------------------Put Method----------------------
  put(path: string, body: any, headers: HttpHeaders = new HttpHeaders({ 'content-type': 'application/json' })): Observable<any> {
    return this.http.put(this.baseUrl  + path, body, { headers }).pipe(
      tap((Response: any) => console.log('Status :', Response.message)),
      catchError(error => {
        return throwError(error);
      })

    );
  }
  // ------------------Delete Method----------------------
  delete(path: string, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.http.delete(this.baseUrl  + path, { headers }).pipe(
      tap((Response: any) => console.log('Status :', Response.message)),
      catchError(error => {
        return throwError(error);
      })

    );
  }

}


