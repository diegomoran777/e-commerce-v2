import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl } from './../../API_URL/api_url';
import { User } from './../../model/user';
import { IUser } from './../../model/IUser.model'
import { Purchase } from '../../model/purchase'
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = ApiUrl.USER;  

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.API_URL}/users`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getUserByUserName(userName: any): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/getuser`, {userName: userName} ).pipe(
      catchError(this.errorHandler)
    );
  }

  public validateUser(userName: any, password: any): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/validate-user`, {userName: userName, password: password} ).pipe(
      catchError(this.errorHandler)
    );
  }

  public getPurchases(userName: any): Observable<Purchase[]> {
    return this.http.post<Purchase[]>(`${this.API_URL}/purchases`, {userName: userName} ).pipe(
      catchError(this.errorHandler)
    );
  }

  public getPurchasesByParamsDate(date_approved: any, userName: any): Observable<Purchase[]> {
    return this.http.post<Purchase[]>(`${this.API_URL}/search-by-date`, {date_approved: date_approved , userName: userName} ).pipe(
      catchError(this.errorHandler)
    );
  }

  public getUser(userName: any): Observable<User[]> {
    return this.http.post<User[]>(`${this.API_URL}/get-user`, {userName: userName} ).pipe(
      catchError(this.errorHandler)
    );
  }

  public existsUserName(userName: any) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.API_URL}/exists`, {userName: userName},  {headers: headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  public existsUserBYEmail(email: any) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post(`${this.API_URL}/exists-email`, {email: email},  {headers: headers}).pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteUserById(userId: string) {
    return this.http.delete(`${this.API_URL}/${userId}`, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public updateUser(user: User): Observable<User> {
    const formData = this.formDataCreate(user, true);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<User>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  public addUser(user: User): Observable<User> {
    const formData = this.formDataCreate(user, false);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<User>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  private formDataCreate(user: User, addUpdate: boolean) {
    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("role", user.role);
    formData.append("email", user.email);
    if(addUpdate) {
      formData.append("id", user.id);
      formData.append("password", user.password);
      return formData;
    } else {
      formData.append("password", crypto.SHA256(user.password).toString());
      return formData;
    }
  }

  public getUsersByParams(userName:  string, role: string): Observable<IUser[]> {
    return this.http.post<IUser[]>(`${this.API_URL}/search-by-params`, {userName: userName, role: role}).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("Error en el servicio");
    return throwError(error);
  }
}
