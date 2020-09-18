import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

const AUTH_API = 'http://localhost:8080/api/auth/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  login( c ): Observable<any>{
    return this.http.post(AUTH_API + 'signin',{
      username: c.username,
      password: c.password
    }, httpOptions);
  }

  register(user): Observable<any>{
    return this.http.post(AUTH_API + 'signup',{
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
}
