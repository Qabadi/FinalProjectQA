import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';
  
  private loggedUser: string | undefined;
  private isuserAuthenticated = new BehaviorSubject<boolean>(false);
  private JWT_TOKEN = 'jwtToken';
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {}



  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  private doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    this.storeJwtToken(tokens.token);
    this.isuserAuthenticated.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isuserAuthenticated.next(false);
    this.router.navigate(['/index']);
  }

  authenticated(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }
}
